import OnboardingForm from "@/components/forms/onboarding/onboarding-form";
import { prisma } from "@/lib/db";
import { requireUser } from "@/utils/requireUser";
import { redirect } from "next/navigation";
import React from "react";

async function OnboardingCheck(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onboardingCompleted: true,
    },
  });

  if (user?.onboardingCompleted === true) {
    return redirect("/");
  }
}

const OnboardingPage = async () => {
  const session = await requireUser();
  await OnboardingCheck(session.id as string);
  return (
    <div className="min-h-screen  w-screen flex flex-col items-center justify-center py-10">
      <OnboardingForm />
    </div>
  );
};

export default OnboardingPage;
