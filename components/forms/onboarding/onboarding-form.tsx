"use client";

import React, { useState } from "react";
import Logo from "@/public/globe.svg";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import UserTypeSelection from "./user-type-form";
import CompanyForm from "./company-form";
import JobSeekerForm from "./jobseeker-form";

type UserSelectionType = "company" | "jobSeeker" | null;

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  function handleUserTypeSeletion(type: UserSelectionType) {
    setUserType(type);
    setStep(2);
  }

  function renderSteps() {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeSeletion} />;
      case 2:
        return userType === "company" ? <CompanyForm /> : <JobSeekerForm />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-10">
        <Image src={Logo} alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">Logo</h1>
      </div>
      <Card className="max-w-lg w-full">
        <CardContent className="p-6">{renderSteps()}</CardContent>
      </Card>
    </>
  );
};

export default OnboardingForm;
