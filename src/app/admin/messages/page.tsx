import { requireAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/ui/back-link";
import { MessageList } from "@/features/admin/message-list";

export default async function AdminMessagesPage() {
  await requireAdmin();
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-sand py-16">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">Admin</p>
              <h1 className="font-display text-4xl text-ink">Manage contact messages</h1>
            </div>
            <BackLink href="/admin" label="Back to dashboard" />
          </div>
          <MessageList messages={messages} />
        </div>
      </Container>
    </div>
  );
}
