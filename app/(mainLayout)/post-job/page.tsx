import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import GoogleLogo from "@/public/google.png";
import AppleLogo from "@/public/Apple.svg";
import MetaLogo from "@/public/Meta.svg";
import Samsung from "@/public/samsung.svg";
import VercelLogo from "@/public/vercel.svg";
import Image from "next/image";
import { CreateJobForm } from "@/components/forms/create-job-form";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { requireUser } from "@/utils/requireUser";

const companies = [
  { id: 1, name: "Google", logo: GoogleLogo },
  { id: 2, name: "Apple", logo: AppleLogo },
  { id: 3, name: "Meta", logo: MetaLogo },
  { id: 4, name: "Samsung", logo: Samsung },
  { id: 5, name: "Vercel", logo: VercelLogo },
];

const testimonials = [
  {
    quote:
      "Lorem ipsum dolor sit Lorem, ipsum dolor.ur adipisicing elit. Quisquam, voluptatum.",
    author: "John Doe",
    company: "Google",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet lorem2 adipisicing elit. Quisquam, voluptatum.",
    author: "John Doe",
    company: "Google",
  },
  {
    quote:
      "Lorem ipsum dolor sit aje ad      adipisicing elit. Quisquam, voluptatum.",
    author: "John Doe",
    company: "Google",
  },
];

const stats = [
  { id: 0, value: "12k+", label: "Monthly active job seekers" },
  { id: 1, value: "48h", label: "Average time to hire" },
  { id: 2, value: "100%", label: "Job seekers satisfaction rate" },
  { id: 3, value: "500+", label: "Companies hiring regularly" },
];

async function getCompanyData(userId: string) {
  const data = await prisma.company.findUnique({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      logo: true,
      about: true,
      website: true,
      xAccount: true,
      location: true,
    },
  });

  if (!data) {
    return redirect("/onboarding");
  }

  return data;
}

export default async function PostJobPage() {
  const session = await requireUser();
  const data = await getCompanyData(session.id as string);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <CreateJobForm
        companyAbout={data.about}
        companyLocation={data.location}
        companyLogo={data.logo}
        companyName={data.name}
        companyWebsite={data.website}
        companyXAccount={data.xAccount}
      />

      <div className="col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Trused by thousands of companies</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Possimus, quisquam?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {companies.map((company) => (
                <div key={company.id}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
            <div>
              {testimonials.map((testimonial) => (
                <div key={testimonial.quote}>
                  <p>{testimonial.quote}</p>
                  <p>{testimonial.author}</p>
                  <p>{testimonial.company}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.id}>
                  <p>{stat.value}</p>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
