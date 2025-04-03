import { deleleJobPost } from "@/app/action";
import GeneralSubmitButton from "@/components/general/general-submit-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireUser } from "@/utils/requireUser";
import { ArrowLeft, Trash } from "lucide-react";
import Link from "next/link";

type Params = Promise<{ jobId: string }>;
export default async function DeleteJobPage({ params }: { params: Params }) {
  const { jobId } = await params;
  await requireUser();
  return (
    <div>
      <Card className="max-w-lg mx-auto mt-28">
        <CardHeader>
          <CardTitle>Are you sure you want to delete this job?</CardTitle>
          <CardDescription>
            This action cannot be undone, this will permanently delete this job
            from the database. Are you sure?
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link
            href="/my-jobs"
            className={buttonVariants({ variant: "outline" })}
          >
            <ArrowLeft /> Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await deleleJobPost(jobId);
            }}
          >
            <GeneralSubmitButton
              text="Delete"
              variant="destructive"
              icon={<Trash />}
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
