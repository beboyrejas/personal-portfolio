import Link from "next/link";
import type { Project } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { parseStack } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-[2rem] bg-white p-8 shadow-card transition hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Badge>{project.featured ? "Featured" : "Project"}</Badge>
          <Link href={`/projects/${project.slug}`} className="text-sm font-semibold text-ember">
            View case study
          </Link>
        </div>
        <div className="space-y-3">
          <h3 className="font-display text-2xl text-ink">{project.title}</h3>
          <p className="leading-7 text-ink/70">{project.excerpt}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {parseStack(project.stack).map((item) => (
            <span key={item} className="rounded-full bg-sand px-3 py-2 text-xs font-medium text-ink/70">
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
