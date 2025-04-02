"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SaveJobButton({ savedJob }: { savedJob: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} variant={"outline"} type="submit">
      {pending ? (
        <>
          <Loader2 className="size-4 mr-2 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Heart
            className={cn(
              savedJob ? "fill-current text-red-500" : "",
              "size-4 transition-colors"
            )}
          />
          {savedJob ? "Saved" : "Save Job"}
        </>
      )}
    </Button>
  );
}
