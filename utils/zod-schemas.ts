import { z } from "zod";

export const companySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters long" }),
  about: z
    .string()
    .min(2, { message: "About must be at least 2 characters long" }),
  logo: z.string().min(1, { message: "Please upload a logo" }),
  website: z.string().url({ message: "Please enter a valid URL" }),
  xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  about: z
    .string()
    .min(2, { message: "About must be at least 2 characters long" }),
  resume: z.string().min(1, { message: "Please upload a resume" }),
});

export const jobSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  location: z.string().min(1, "Location is required"),
  salaryFrom: z.number().min(1, "Salary from is required"),
  salaryTo: z.number().min(1, "Salary to is required"),
  jobDescription: z.string().min(1, "Job description is required"),
  listingDuration: z.number().min(1, "Listing duration is required"),
  benefits: z.array(z.string()).min(1, "Benefits are required"),
  companyName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  companyLocation: z
    .string()
    .min(2, { message: "Location must be at least 2 characters long" }),
  companyAbout: z
    .string()
    .min(2, { message: "About must be at least 2 characters long" }),
  companyLogo: z.string().min(1, { message: "Please upload a logo" }),
  companyWebsite: z.string().url({ message: "Please enter a valid URL" }),
  companyXAccount: z.string().optional(),
});
