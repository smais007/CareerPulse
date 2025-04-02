import { saveJobPost, unSaveJobPost } from "@/app/action";
import { JSONtoHTML } from "@/components/general/json-to-html";
import { SaveJobButton } from "@/components/general/save-job-button";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";
import arcjet, { tokenBucket, detectBot } from "@/utils/arcjet";
import { auth } from "@/utils/auth";
import { benefits } from "@/utils/benefits";
import { getFlagEmoji } from "@/utils/countries-list";
import { request } from "@arcjet/next";
import Link from "next/link";
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

async function getJobDetails(jobId: string, userId?: string) {
  const [jobData, savedJob] = await Promise.all([
    await prisma.jobPost.findUnique({
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
    }),
    userId
      ? prisma.savedJobPost.findUnique({
          where: {
            userId_jobPostId: {
              userId: userId,
              jobPostId: jobId,
            },
          },
          select: {
            id: true,
          },
        })
      : null,
  ]);

  if (!jobData) {
    return notFound();
  }

  return { jobData, savedJob };
}

export default async function JobPage({ params }: { params: Params }) {
  const { jobId } = await params;

  const session = await auth();
  const req = await request();
  const decision = await getClient(!!session).protect(req, { requested: 10 });

  if (decision.isDenied()) {
    throw new Error("Rate limit exceeded");
  }

  const { jobData, savedJob } = await getJobDetails(jobId, session?.user?.id);

  const locationFlag = getFlagEmoji(jobData.location);

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="space-y-8 col-span-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{jobData.jobTitle}</h1>
            <p className="text-muted-foreground text-sm">Smais LLC</p>
            <p className="text-muted-foreground text-sm">1 day ago</p>
            <Badge className="rounded-full">
              {locationFlag} <span>{jobData.location}</span>
            </Badge>
          </div>

          {session?.user ? (
            <form
              action={
                savedJob
                  ? unSaveJobPost.bind(null, savedJob.id)
                  : saveJobPost.bind(null, jobId)
              }
            >
              <SaveJobButton savedJob={!!savedJob} />
            </form>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline" })}
            >
              Login
            </Link>
          )}
        </div>

        <section>
          <JSONtoHTML json={JSON.parse(jobData.jobDescription)} />
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
              const isOffered = jobData.benefits.includes(benefit.id);
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
                Please let {jobData.Company.name} know you found this job on
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
                  jobData.createdAt.getTime() +
                    jobData.listingDuration * 24 * 60 * 60 * 1000
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
                {jobData.createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Emplyment Type</span>
              <span>{jobData.employmentType}</span>
            </div>
            <div className="flex justify-between">
              <span>Job Location</span>
              {locationFlag && <span>{locationFlag}</span>} {jobData.location}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3>About the Company</h3>
          <div className="flex justify-between">
            <span>Company Name</span>
            <span>{jobData.Company.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Company Location</span>
            <span>{jobData.Company.location}</span>
          </div>
          <div className="flex justify-between">
            <span>Company Website</span>
            <a href={jobData.Company.website}>Go to Website</a>
          </div>
          <div>
            <p className="">{jobData.Company.about}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
