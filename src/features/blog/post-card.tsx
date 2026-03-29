import Link from "next/link";
import type { Post } from "@prisma/client";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-[2rem] bg-white p-8 shadow-card">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">
          {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
        </p>
        <div className="space-y-3">
          <h3 className="font-display text-2xl text-ink">{post.title}</h3>
          <p className="leading-7 text-ink/70">{post.excerpt}</p>
        </div>
        <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-pine">
          Read article
        </Link>
      </div>
    </article>
  );
}
