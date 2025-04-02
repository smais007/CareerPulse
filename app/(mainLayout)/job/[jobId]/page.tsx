import { JSONtoHTML } from "@/components/general/json-to-html";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";
import arcjet, { tokenBucket, detectBot } from "@/utils/arcjet";
import { auth } from "@/utils/auth";
import { benefits } from "@/utils/benefits";
import { getFlagEmoji } from "@/utils/countries-list";
import { request } from "@arcjet/next";
import { Heart } from "lucide-react";
import { notFound } from "next/navigation";

type Params = Promise<{ jobId: string }>;

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
  })
);

function getClient(session: boolean) {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: "DRY_RUN",
        refillRate: 30,
        interval: 60,
        capacity: 100,
      })
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: "DRY_RUN",
        refillRate: 10,
        interval: 60,
        capacity: 100,
      })
    );
  }
}

async function getJobDetails(jobId: string) {
  const jobData = await prisma.jobPost.findUnique({
    where: {
      id: jobId,
      status: "ACTIVE",
    },
    select: {
      jobTitle: true,
      employmentType: true,
      location: true,
      salaryFrom: true,
      salaryTo: true,
      jobDescription: true,
      benefits: true,
      createdAt: true,
      listingDuration: true,
      Company: {
        select: {
          name: true,
          location: true,
          about: true,
          logo: true,
          website: true,
        },
      },
    },
  });

  if (!jobData) {
    return notFound();
  }

  return jobData;
}

export default async function JobPage({ params }: { params: Params }) {
  const { jobId } = await params;

  const session = await auth();
  const req = await request();
  const decision = await getClient(!!session).protect(req, { requested: 10 });

  if (decision.isDenied()) {
    throw new Error("Rate limit exceeded");
  }

  const data = await getJobDetails(jobId);

  const locationFlag = getFlagEmoji(data.location);

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="space-y-8 col-span-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{data.jobTitle}</h1>
            <p className="text-muted-foreground text-sm">Smais LLC</p>
            <p className="text-muted-foreground text-sm">1 day ago</p>
            <Badge className="rounded-full">
              {locationFlag} <span>{data.location}</span>
            </Badge>
          </div>

          <Button>
            <Heart /> Save Job
          </Button>
        </div>

        <section>
          <JSONtoHTML json={JSON.parse(data.jobDescription)} />
        </section>
        <section>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Job Benefits</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="size-3 bg-primary rounded-[4px]" />
                <p className="text-sm ">Offered</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 bg-primary opacity-30 rounded-[4px]" />
                <p className="text-sm ">Not Offered</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit) => {
              const isOffered = data.benefits.includes(benefit.id);
              return (
                <Badge
                  key={benefit.id}
                  variant={isOffered ? "default" : "outline"}
                  className={cn(
                    isOffered ? "" : "opacity-60 cursor-not-allowed",
                    "cursor-pointer rounded-full"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {benefit.icon}
                    {benefit.label}
                  </span>
                </Badge>
              );
            })}
          </div>
        </section>
      </div>
      {/* Sidebar */}
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Apply Now</h3>
              <p className="text-muted-foreground text-sm">
                Please let {data.Company.name} know you found this job on
                CareerPulse, this help us grow our community!
              </p>
            </div>
            <Button className="w-full">Apply Now</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3>About the Job</h3>
          <div>
            <div className="flex justify-between">
              <span>Apply Before</span>
              <span>
                {new Date(
                  data.createdAt.getTime() +
                    data.listingDuration * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Postad on</span>
              <span>
                {data.createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Emplyment Type</span>
              <span>{data.employmentType}</span>
            </div>
            <div className="flex justify-between">
              <span>Job Location</span>
              {locationFlag && <span>{locationFlag}</span>} {data.location}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3>About the Company</h3>
          <div className="flex justify-between">
            <span>Company Name</span>
            <span>{data.Company.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Company Location</span>
            <span>{data.Company.location}</span>
          </div>
          <div className="flex justify-between">
            <span>Company Website</span>
            <a href={data.Company.website}>Go to Website</a>
          </div>
          <div>
            <p className="">{data.Company.about}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
