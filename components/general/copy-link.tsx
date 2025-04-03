"use client";

import { Link2 } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner";

export function CoptLinkMenuItem({ jobUrl }: { jobUrl: string }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(jobUrl);
      toast.success("Copied to clipboard");
    } catch (e) {
      console.log(e);
      toast.error("Failed to copy to clipboard");
    }
  }

  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 className="size-4" />
      <span>Copy Link</span>
    </DropdownMenuItem>
  );
}
