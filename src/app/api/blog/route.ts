import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }]
  });

  return NextResponse.json(posts);
}
