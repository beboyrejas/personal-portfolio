import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { formatDate } from "@/lib/utils";
import { getPostBySlug } from "@/lib/data";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <PageShell>
      <section className="py-24">
        <Container>
          <article className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">
                {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
              </p>
              <h1 className="font-display text-5xl tracking-tight text-ink">{post.title}</h1>
              <p className="text-xl leading-9 text-ink/70">{post.excerpt}</p>
            </div>
            <div className="rounded-[2rem] bg-white p-8 shadow-card">
              <p className="whitespace-pre-wrap text-lg leading-9 text-ink/80">{post.content}</p>
            </div>
          </article>
        </Container>
      </section>
    </PageShell>
  );
}
