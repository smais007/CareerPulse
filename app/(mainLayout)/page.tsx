import { JobFilter } from "@/components/general/job-filter";
import { JobListings } from "@/components/general/job-listings";

export default function Home() {
  return (
    <div className=" grid grid-cols-3 gap-6">
      <JobFilter />
      <div className="col-span-2 flex flex-col gap-6">
        <JobListings />
      </div>
    </div>
  );
}
