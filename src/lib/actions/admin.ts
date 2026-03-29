"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { parseStack } from "@/lib/utils";
import { postSchema } from "@/lib/validators/post";
import { projectSchema } from "@/lib/validators/project";

function asBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

export async function upsertProjectAction(formData: FormData) {
  await requireAdmin();

  const parsed = projectSchema.safeParse({
    id: formData.get("id")?.toString() || undefined,
    title: formData.get("title")?.toString(),
    slug: formData.get("slug")?.toString(),
    excerpt: formData.get("excerpt")?.toString(),
    description: formData.get("description")?.toString(),
    stack: formData.get("stack")?.toString(),
    repository: formData.get("repository")?.toString(),
    demoUrl: formData.get("demoUrl")?.toString(),
    imageUrl: formData.get("imageUrl")?.toString(),
    featured: asBoolean(formData.get("featured")),
    published: asBoolean(formData.get("published"))
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid project payload.");
  }

  const data = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt,
    description: parsed.data.description,
    stack: parseStack(parsed.data.stack).join(", "),
    repository: parsed.data.repository || null,
    demoUrl: parsed.data.demoUrl || null,
    imageUrl: parsed.data.imageUrl || null,
    featured: parsed.data.featured,
    published: parsed.data.published
  };

  if (parsed.data.id) {
    await prisma.project.update({
      where: { id: parsed.data.id },
      data
    });
  } else {
    await prisma.project.create({ data });
  }

  revalidatePath("/projects");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();

  if (!id) {
    throw new Error("Missing project id.");
  }

  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
}

export async function upsertPostAction(formData: FormData) {
  await requireAdmin();

  const published = asBoolean(formData.get("published"));
  const parsed = postSchema.safeParse({
    id: formData.get("id")?.toString() || undefined,
    title: formData.get("title")?.toString(),
    slug: formData.get("slug")?.toString(),
    excerpt: formData.get("excerpt")?.toString(),
    content: formData.get("content")?.toString(),
    coverImage: formData.get("coverImage")?.toString(),
    published
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid post payload.");
  }

  const data = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    coverImage: parsed.data.coverImage || null,
    published: parsed.data.published,
    publishedAt: parsed.data.published ? new Date() : null
  };

  if (parsed.data.id) {
    await prisma.post.update({
      where: { id: parsed.data.id },
      data
    });
  } else {
    await prisma.post.create({ data });
  }

  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/admin/blog");
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();

  if (!id) {
    throw new Error("Missing post id.");
  }

  await prisma.post.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/admin/blog");
}

export async function updateMessageStatusAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString();

  if (!id || !status) {
    throw new Error("Missing message update payload.");
  }

  await prisma.message.update({
    where: { id },
    data: {
      status: status as "UNREAD" | "READ" | "ARCHIVED"
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}
