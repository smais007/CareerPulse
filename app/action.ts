"use server";

import { prisma } from "@/lib/db";
import arcjet, { detectBot, shield } from "@/utils/arcjet";
import { requireUser } from "@/utils/requireUser";
import { companySchema, jobSchema, jobSeekerSchema } from "@/utils/zod-schemas";
import { request } from "@arcjet/next";
import { redirect } from "next/navigation";
import { z } from "zod";

const aj = arcjet
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  );

export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validateData = companySchema.parse(data);

  await prisma.user.update({
    where: {
      id: session.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "COMPANY",
      Company: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect("/");
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validateData = jobSeekerSchema.parse(data);

  await prisma.user.update({
    where: {
      id: user.id as string,
    },
    data: {
      onboardingCompleted: true,
      userType: "JOB_SEEKER",
      JobSeeker: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect("/");
}

export async function createJob(data: z.infer<typeof jobSchema>) {
  try {
    const user = await requireUser();

    const req = await request();
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      console.log(" 🚫 Request denied by Arcjet protection");
      return { error: " 🚫Request blocked by security rules" };
    }

    console.log(" 🆗 Validating job data");
    const validatedData = jobSchema.parse(data);
    console.log(" 🆗Data validated successfully");

    console.log("🆗Looking up company");
    const company = await prisma.company.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!company?.id) {
      console.log("No company found for user, redirecting to onboarding");
      return { error: "Please complete company onboarding first" };
    }

    console.log(" 🆗Creating job post");
    await prisma.jobPost.create({
      data: {
        jobDescription: validatedData.jobDescription,
        jobTitle: validatedData.jobTitle,
        employmentType: validatedData.employmentType,
        location: validatedData.location,
        salaryFrom: validatedData.salaryFrom,
        salaryTo: validatedData.salaryTo,
        listingDuration: validatedData.listingDuration,
        benefits: validatedData.benefits,
        companyId: company.id,
      },
    });
    console.log("Job post created successfully");

    return { success: true };
  } catch (error) {
    console.error("Error in createJob:", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }
}
