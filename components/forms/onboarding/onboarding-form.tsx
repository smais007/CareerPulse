import React from "react";
import Logo from "@/public/globe.svg";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const OnboardingForm = () => {
  return (
    <>
      <div className="flex items-center gap-2 mb-10">
        <Image src={Logo} alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">Logo</h1>
      </div>
      <Card className="max-w-lg w-full">
        <CardContent></CardContent>
      </Card>
    </>
  );
};

export default OnboardingForm;
