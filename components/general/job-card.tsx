import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/utils/formatCurrency";
import { MapPin } from "lucide-react";
import { formatRelativeTime } from "@/utils/formate-time";

interface JobCardProps {
  job: {
    id: string;
    createdAt: Date;
    Company: {
      name: string;
      location: string;
      about: string;
      logo: string;
    };
    jobTitle: string;
    employmentType: string;
    location: string;
    salaryFrom: number;
    salaryTo: number;
  };
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={"/job"}>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flrx-row gap-4">
            <Image
              src={job.Company.logo}
              alt={job.Company.name}
              width={40}
              height={40}
              className="size-12 rounded-xl"
            />
            <div>
              <h1 className="text-xl font-bold md:text-2xl">{job.jobTitle}</h1>
              <div className="flex flex-wrap gap-2">
                <p className="text-sm font-muted-foreground">
                  {job.Company.name}
                </p>
                <Badge className="rounded-full">{job.employmentType}</Badge>
                <Badge className="rounded-full">{job.location}</Badge>

                <p className="text-sm font-muted">
                  {formatCurrency(job.salaryFrom)} -
                  {formatCurrency(job.salaryTo)}
                </p>
              </div>
            </div>
            <div className="md:ml-auto">
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                <h1>{job.location}</h1>
              </div>

              <p>{formatRelativeTime(job.createdAt)}</p>
            </div>
          </div>
          <p className="text-sm font-mutred-foreground line-clamp-2">
            {job.Company.about}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
}
