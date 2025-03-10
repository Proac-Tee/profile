import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters" })
    .max(500, { message: "Message must not exceed 500 characters" }),
});
