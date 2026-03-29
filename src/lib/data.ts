import { prisma } from "@/lib/db/prisma";

function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

async function withDatabaseFallback<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  if (!isDatabaseConfigured()) {
    return fallback;
  }

  try {
    return await operation();
  } catch (error) {
    console.error("Database query failed, using fallback data.", error);
    return fallback;
  }
}

export async function getFeaturedProjects() {
  return withDatabaseFallback(
    () =>
      prisma.project.findMany({
        where: { published: true, featured: true },
        orderBy: { updatedAt: "desc" }
      }),
    []
  );
}

export async function getPublishedProjects() {
  return withDatabaseFallback(
    () =>
      prisma.project.findMany({
        where: { published: true },
        orderBy: [{ featured: "desc" }, { updatedAt: "desc" }]
      }),
    []
  );
}

export async function getProjectBySlug(slug: string) {
  return withDatabaseFallback(
    () =>
      prisma.project.findUnique({
        where: { slug }
      }),
    null
  );
}

export async function getPublishedPosts() {
  return withDatabaseFallback(
    () =>
      prisma.post.findMany({
        where: { published: true },
        orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }]
      }),
    []
  );
}

export async function getPostBySlug(slug: string) {
  return withDatabaseFallback(
    () =>
      prisma.post.findUnique({
        where: { slug }
      }),
    null
  );
}

export async function getDashboardSnapshot() {
  const [projects, posts, messages] = await withDatabaseFallback(
    () =>
      Promise.all([
        prisma.project.count(),
        prisma.post.count(),
        prisma.message.count()
      ]),
    [0, 0, 0] as const
  );

  return { projects, posts, messages };
}
