import { z } from "zod";
import { slugify } from "@/lib/utils";

export const postSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  slug: z
    .string()
    .min(2)
    .transform((value) => slugify(value)),
  excerpt: z.string().min(10),
  content: z.string().min(50),
  coverImage: z.string().url().optional().or(z.literal("")),
  published: z.boolean().default(true)
});

export type PostInput = z.infer<typeof postSchema>;
