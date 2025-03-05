import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  techStack: z.array(z.string().min(1, "Tech stack must not be empty")),
  githubUrl: z.string().url("Invalid GitHub URL").optional(),
  liveUrl: z.string().url("Invalid live URL").optional(),
  imageUrls: z
    .array(
      z.object({
        url: z.string().url("Invalid image URL"),
        size: z.object({
          width: z.number().positive("Width must be a positive number"),
          height: z.number().positive("Height must be a positive number"),
        }),
        name: z.string().min(1, "Image name cannot be empty"),
      }),
    )
    .optional(),
});

export type ICreateProjectSchema = z.infer<typeof projectSchema>;

export const projectIdSchema = z.object({
  _id: z.string().min(1, "Project ID is required"),
});

export const partialProjectSchema = projectSchema.partial(); // Allows partial updates
