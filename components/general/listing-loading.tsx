import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function JobListingLoading() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card key={index}>
          <div>
            <Skeleton className="size-12 rounded-full" />
          </div>
        </Card>
      ))}
    </div>
  );
}
