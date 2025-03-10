import { z } from "zod";

// Define Zod schema for images
export const resumeSchema = z.object({
  key: z.string(),
  url: z.string().url("Invalid image URL"),
  size: z.number().positive("Size must be a positive number"),
  name: z.string(),
});

export type ICreateResumeSchema = z.infer<typeof resumeSchema>;
