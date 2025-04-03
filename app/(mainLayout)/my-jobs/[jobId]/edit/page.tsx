import { EditJobForm } from "@/components/forms/edit-job-form";
import { prisma } from "@/lib/db";
import { requireUser } from "@/utils/requireUser";
import { notFound } from "next/navigation";

async function getData(jobId: string, userId: string) {
  const data = await prisma.jobPost.findUnique({
    where: {
      id: jobId,
      Company: {
        userId: userId,
      },
    },
    select: {
      benefits: true,
      id: true,
      jobTitle: true,
      jobDescription: true,
      salaryFrom: true,
      salaryTo: true,
      location: true,
      employmentType: true,
      listingDuration: true,
      Company: {
        select: {
          name: true,
          about: true,
          website: true,
          logo: true,
          xAccount: true,
          location: true,
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }

  return data;
}
type Params = Promise<{ jobId: string }>;
export default async function EditJobPage({ params }: { params: Params }) {
  const { jobId } = await params;

  const user = await requireUser();
  const data = await getData(jobId, user.id as string);
  return <EditJobForm jobPost={data} />;
}
