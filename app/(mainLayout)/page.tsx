import { JobFilter } from "@/components/general/job-filter";
import { JobListings } from "@/components/general/job-listings";
import { JobListingLoading } from "@/components/general/listing-loading";
import { Suspense } from "react";

type SearchParams = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Home({ searchParams }: SearchParams) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  return (
    <div className=" grid grid-cols-3 gap-6">
      <JobFilter />
      <div className="col-span-2 flex flex-col gap-6">
        <Suspense fallback={<JobListingLoading />} key={currentPage}>
          <JobListings currentPage={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}
