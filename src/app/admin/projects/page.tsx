import { requireAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/ui/back-link";
import { ProjectManager } from "@/features/admin/project-manager";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-sand py-16">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">Admin</p>
              <h1 className="font-display text-4xl text-ink">Manage projects</h1>
            </div>
            <BackLink href="/admin" label="Back to dashboard" />
          </div>
          <ProjectManager projects={projects} />
        </div>
      </Container>
    </div>
  );
}
