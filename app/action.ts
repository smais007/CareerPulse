"use server";

import { prisma } from "@/lib/db";
import { requireUser } from "@/utils/requireUser";
import { companySchema } from "@/utils/zod-schemas";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await requireUser();

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
