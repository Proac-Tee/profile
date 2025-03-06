import { z } from "zod";
import { IImage } from "../schemas/schema";

// Define Zod schema for images
const imageSchema = z.object({
  key: z.string(),
  url: z.string().url("Invalid image URL"),
  size: z.number().positive("Size must be a positive number"),
  name: z.string(),
});

// Define Zod schema for project
export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  techStack: z.array(z.string().min(1, "Tech stack must not be empty")),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  imageUrls: z.array(imageSchema).min(1, "At least one image is required"),
});

// Define Zod schema for project
export const updateProjectSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  techStack: z.array(z.string().min(1, "Tech stack must not be empty")),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
});

// Define Zod schema for project
export const clientProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  techStack: z.array(z.string().min(1, "Tech stack must not be empty")),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
});

export type IClientCreateProjectSchema = z.infer<typeof projectSchema>;

export type ICreateProjectSchema = z.infer<typeof projectSchema>;

export const projectIdSchema = z.object({
  _id: z.string().min(1, "Project ID is required"),
});

export const projectDeleteSchema = z.object({
  _id: z.string().min(1, "Project ID is required"),
  images: z.array(z.string().min(1, "Required")),
});

export type FormState = {
  success: boolean;
  message: string;
  errors: Record<string, string[]>; // Consistent structure for errors
};

export const partialProjectSchema = projectSchema.partial(); // Allows partial updates

export type IPartialProjectSchema = z.infer<typeof updateProjectSchema>;

export type DashboardProps = {
  _id: string;
  imageUrls: IImage[];
  view_text: string;
  update_text: string;
  delete_text: string;
};
