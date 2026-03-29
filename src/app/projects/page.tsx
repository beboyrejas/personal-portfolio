import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/features/projects/project-card";
import { getPublishedProjects } from "@/lib/data";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <PageShell>
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Projects"
            title="Case studies, experiments, and shipped platforms"
            description="Projects are stored in SQLite for local development and managed through the admin dashboard."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
