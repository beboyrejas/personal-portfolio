import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostCard } from "@/features/blog/post-card";
import { ProjectCard } from "@/features/projects/project-card";
import { getFeaturedProjects, getPublishedPosts } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default async function HomePage() {
  const [projects, posts] = await Promise.all([getFeaturedProjects(), getPublishedPosts()]);

  return (
    <PageShell>
      <section className="overflow-hidden py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-8">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-ember">IT Graduate | QA hands-on Web testing & Web Development | Hardware troubleshooting | UI/UX Design</p>
              <div className="space-y-6">
                <h1 className="max-w-4xl font-display text-5xl tracking-tight text-ink md:text-7xl">Raymond Rejas</h1>
                <p className="max-w-2xl text-xl leading-9 text-ink/70">I build practical and user-focused digital solutions with a strong foundation in quality assurance, UI/UX, and problem-solving.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/projects">
                  <Button>See projects</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary">Start a conversation</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-ember/20 blur-3xl" />
              <div className="relative rounded-[2.5rem] bg-white p-8 shadow-card">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pine">What I bring</p>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-ink/75">
                  <li>Background in hardware troubleshooting, computer literacy, UI/UX design, and quality assurance.</li>
                  <li>Hands-on experience testing design systems and improving user-focused digital experiences.</li>
                  <li>Strong interest in solving technical problems through practical and functional solutions.</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Featured work"
            title="Selected projects built for real teams and measurable outcomes"
            description="A sharp, editorial portfolio layout with CMS-like project management behind the scenes."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Writing"
              title="Notes on craft, systems, and shipping product well"
              description="A blog designed to feel editorial on the front end while staying easy to maintain from the dashboard."
            />
            <Link href="/blog" className="hidden items-center gap-2 text-sm font-semibold text-pine md:inline-flex">
              View all posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {posts.slice(0, 2).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
