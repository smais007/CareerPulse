"use client";

import { Button } from "@/components/ui/button";
import React from "react";

type UserSelectionType = "company" | "jobSeeker";

interface UserTypeSelectionProps {
  onSelect: (type: UserSelectionType) => void;
}

const UserTypeSelection = ({ onSelect }: UserTypeSelectionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2>Welcome Lest get started</h2>
        <p>Choose how you would like to use the platform</p>
      </div>
      <div className="grid gap-4">
        <Button onClick={() => onSelect("company")}>
          <div>
            <h3>Company / Organization</h3>
            <p>Get hire your talent</p>
          </div>
        </Button>
        <Button onClick={() => onSelect("jobSeeker")}>
          <div>
            <h3>Job Seeker</h3>
            <p>Find your dream job</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default UserTypeSelection;
