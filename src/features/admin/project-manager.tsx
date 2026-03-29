import type { Project } from "@prisma/client";
import { deleteProjectAction, upsertProjectAction } from "@/lib/actions/admin";
import { parseStack } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function ProjectForm({ project }: { project?: Project }) {
  return (
    <form action={upsertProjectAction} className="space-y-3 rounded-3xl border border-ink/10 bg-white p-6">
      <input type="hidden" name="id" defaultValue={project?.id} />
      <input name="title" placeholder="Title" defaultValue={project?.title} className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
      <input name="slug" placeholder="Slug" defaultValue={project?.slug} className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
      <textarea name="excerpt" placeholder="Short summary" defaultValue={project?.excerpt} className="min-h-24 w-full rounded-2xl border border-ink/10 px-4 py-3" />
      <textarea
        name="description"
        placeholder="Long description"
        defaultValue={project?.description}
        className="min-h-32 w-full rounded-2xl border border-ink/10 px-4 py-3"
      />
      <input
        name="stack"
        placeholder="Stack (comma separated)"
        defaultValue={project ? parseStack(project.stack).join(", ") : ""}
        className="w-full rounded-2xl border border-ink/10 px-4 py-3"
      />
      <div className="grid gap-3 md:grid-cols-3">
        <input name="repository" placeholder="Repository URL" defaultValue={project?.repository ?? ""} className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
        <input name="demoUrl" placeholder="Demo URL" defaultValue={project?.demoUrl ?? ""} className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
        <input name="imageUrl" placeholder="Image URL" defaultValue={project?.imageUrl ?? ""} className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-ink/70">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} />
          Featured
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" defaultChecked={project?.published ?? true} />
          Published
        </label>
      </div>
      <Button type="submit">{project ? "Update project" : "Create project"}</Button>
    </form>
  );
}

export function ProjectManager({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-8">
      <ProjectForm />
      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <ProjectForm project={project} />
            <form action={deleteProjectAction} className="flex items-start">
              <input type="hidden" name="id" value={project.id} />
              <Button type="submit" variant="ghost" className="text-red-600">
                Delete
              </Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
