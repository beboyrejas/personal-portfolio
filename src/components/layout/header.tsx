import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/layout/container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-sand/80 backdrop-blur">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
            {siteConfig.name}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-ink/70 transition hover:text-ink">
                {item.label}
              </Link>
            ))}
            <Link href="/admin" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
              Admin
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
