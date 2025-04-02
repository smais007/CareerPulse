import { EmptyState } from "@/components/general/empty-state";
import { JobCard } from "@/components/general/job-card";
import { prisma } from "@/lib/db";
import { requireUser } from "@/utils/requireUser";

async function getData(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: {
      userId: userId,
    },
    select: {
      JobPost: {
        select: {
          id: true,
          jobTitle: true,
          salaryFrom: true,
          salaryTo: true,
          location: true,
          employmentType: true,
          createdAt: true,
          Company: {
            select: {
              name: true,
              logo: true,
              about: true,
              location: true,
            },
          },
        },
      },
    },
  });

  return data;
}

export default async function FavouritesPage() {
  const session = await requireUser();
  const data = await getData(session?.id as string);

  if (data.length == 0) {
    return (
      <EmptyState
        title="No job postings"
        href="/s"
        buttonText="Go to job postings"
        description="Be the first one to post a job"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 mt-5 gap-4">
      {data.map((job) => (
        <JobCard job={job.JobPost} key={job.JobPost.id} />
      ))}
    </div>
  );
}
