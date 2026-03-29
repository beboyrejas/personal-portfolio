import Link from "next/link";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white py-12">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg space-y-3">
            <p className="font-display text-2xl text-ink">{siteConfig.name}</p>
            <p className="text-sm leading-7 text-ink/70">{siteConfig.description}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-ink/70">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <p>Building polished product experiences with a strong engineering backbone.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
