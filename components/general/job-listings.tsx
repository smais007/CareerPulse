import { prisma } from "@/lib/db";
import React from "react";
import { EmptyState } from "./empty-state";
import { JobCard } from "./job-card";
import { MainPagination } from "./main-pagination";
import { JobPostStatus } from "@prisma/client";

async function getData({
  page = 1,
  pageSize = 10,
  jobTypes = [],
  location = "",
}: {
  page: number;
  pageSize: number;
  jobTypes: string[];
  location: string;
}) {
  const skip = (page - 1) * pageSize;

  const where = {
    status: JobPostStatus.ACTIVE,
    ...(jobTypes.length > 0 && {
      employmentType: {
        in: jobTypes,
      },
    }),
    ...(location &&
      location !== "worldwide" && {
        location: location,
      }),
  };

  const [data, totalCount] = await Promise.all([
    await prisma.jobPost.findMany({
      where: where,
      take: pageSize,
      skip: skip,
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
    }),

    prisma.jobPost.count({
      where: {
        status: "ACTIVE",
      },
    }),
  ]);

  return { jobs: data, totalPages: Math.ceil(totalCount / pageSize) };
}

export async function JobListings({
  currentPage,
  jobTypes,
  location,
}: {
  currentPage: number;
  jobTypes: string[];
  location: string;
}) {
  const { jobs: data, totalPages } = await getData({
    page: currentPage,
    pageSize: 2,
    jobTypes: jobTypes,
    location: location,
  });

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
      <div className="mt-5 flex justify-center">
        <MainPagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
}
