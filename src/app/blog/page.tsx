import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostCard } from "@/features/blog/post-card";
import { getPublishedPosts } from "@/lib/data";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <PageShell>
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Blog"
            title="Writing on product, systems, and thoughtful software delivery"
            description="Posts are editable in the admin dashboard and stored locally in SQLite through Prisma."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
