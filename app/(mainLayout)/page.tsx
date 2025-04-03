import { JobFilter } from "@/components/general/job-filter";
import { JobListings } from "@/components/general/job-listings";
import { JobListingLoading } from "@/components/general/listing-loading";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className=" grid grid-cols-3 gap-6">
      <JobFilter />
      <div className="col-span-2 flex flex-col gap-6">
        <Suspense fallback={<JobListingLoading />}>
          <JobListings />
        </Suspense>
      </div>
    </div>
  );
}
