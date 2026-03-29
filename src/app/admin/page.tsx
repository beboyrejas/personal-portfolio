import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { getDashboardSnapshot } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const [snapshot, recentMessages] = await Promise.all([
    getDashboardSnapshot(),
    prisma.message.findMany({
      take: 5,
      orderBy: { createdAt: "desc" }
    })
  ]);

  const stats = [
    { label: "Projects", value: snapshot.projects, href: "/admin/projects" },
    { label: "Blog posts", value: snapshot.posts, href: "/admin/blog" },
    { label: "Messages", value: snapshot.messages, href: "/admin/messages" }
  ];

  return (
    <div className="min-h-screen bg-sand py-16">
      <Container>
        <div className="space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">Dashboard</p>
              <h1 className="font-display text-5xl text-ink">Portfolio control center</h1>
            </div>
            <Link href="/">
              <Button variant="secondary">Back to site</Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((item) => (
              <Link key={item.label} href={item.href} className="rounded-[2rem] bg-white p-8 shadow-card">
                <p className="text-sm uppercase tracking-[0.25em] text-ink/50">{item.label}</p>
                <p className="mt-4 font-display text-5xl text-ink">{item.value}</p>
              </Link>
            ))}
          </div>
          <section className="rounded-[2rem] bg-white p-8 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-ink">Recent messages</h2>
              <Link href="/admin/messages" className="text-sm font-semibold text-pine">
                Open inbox
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="rounded-2xl border border-ink/10 p-4">
                  <p className="font-semibold text-ink">{message.subject}</p>
                  <p className="text-sm text-ink/60">
                    {message.name} · {message.email}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
