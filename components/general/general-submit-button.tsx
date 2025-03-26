"use client";

import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface Props {
  status?: string;
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | undefined;
  className?: string;
  icon?: React.ReactNode;
}

const GeneralSubmitButton = ({
  text,
  variant,
  className,
  icon,
  status,
}: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button variant={variant} className={className} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>{status}</span>
        </>
      ) : (
        <>
          {icon && <div>{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
};

export default GeneralSubmitButton;
