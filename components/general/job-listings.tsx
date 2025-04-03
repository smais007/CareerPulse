import { prisma } from "@/lib/db";
import React from "react";
import { EmptyState } from "./empty-state";
import { JobCard } from "./job-card";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await prisma.jobPost.findMany({
    where: {
      status: "ACTIVE",
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!data) {
    return [];
  }

  return data;
}

export async function JobListings() {
  const data = await getData();

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col gap-6">
          {data.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No job postings"
          href="/post-job"
          buttonText="Post a job"
          description="Be the first one to post a job"
        />
      )}
    </>
  );
}
