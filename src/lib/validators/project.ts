import { z } from "zod";
import { slugify } from "@/lib/utils";

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  slug: z
    .string()
    .min(2)
    .transform((value) => slugify(value)),
  excerpt: z.string().min(10),
  description: z.string().min(30),
  stack: z.string().min(2),
  repository: z.string().url().optional().or(z.literal("")),
  demoUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(true)
});

export type ProjectInput = z.infer<typeof projectSchema>;
