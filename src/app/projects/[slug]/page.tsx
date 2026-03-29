import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { getProjectBySlug } from "@/lib/data";
import { parseStack } from "@/lib/utils";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || !project.published) {
    notFound();
  }

  return (
    <PageShell>
      <section className="py-24">
        <Container>
          <div className="max-w-4xl space-y-8">
            <Badge>{project.featured ? "Featured project" : "Project"}</Badge>
            <div className="space-y-5">
              <h1 className="font-display text-5xl tracking-tight text-ink">{project.title}</h1>
              <p className="text-xl leading-9 text-ink/70">{project.excerpt}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {parseStack(project.stack).map((item) => (
                <span key={item} className="rounded-full bg-white px-4 py-2 text-sm text-ink/70 shadow-card">
                  {item}
                </span>
              ))}
            </div>
            <div className="rounded-[2rem] bg-white p-8 shadow-card">
              <p className="whitespace-pre-wrap text-lg leading-9 text-ink/80">{project.description}</p>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
