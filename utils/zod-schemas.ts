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
