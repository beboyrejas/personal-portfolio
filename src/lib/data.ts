import { prisma } from "@/lib/db/prisma";

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { published: true, featured: true },
    orderBy: { updatedAt: "desc" }
  });
}

export async function getPublishedProjects() {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }]
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug }
  });
}

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }]
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug }
  });
}

export async function getDashboardSnapshot() {
  const [projects, posts, messages] = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.message.count()
  ]);

  return { projects, posts, messages };
}
