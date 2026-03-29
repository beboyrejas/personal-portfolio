import type { Message } from "@prisma/client";
import { updateMessageStatusAction } from "@/lib/actions/admin";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <article key={message.id} className="rounded-[2rem] bg-white p-6 shadow-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-ink">{message.subject}</p>
                <p className="text-sm text-ink/60">
                  {message.name} · {message.email} · {formatDate(message.createdAt)}
                </p>
              </div>
              <p className="max-w-3xl whitespace-pre-wrap leading-7 text-ink/75">{message.message}</p>
            </div>
            <div className="flex gap-2">
              {["UNREAD", "READ", "ARCHIVED"].map((status) => (
                <form key={status} action={updateMessageStatusAction}>
                  <input type="hidden" name="id" value={message.id} />
                  <input type="hidden" name="status" value={status} />
                  <Button type="submit" variant={message.status === status ? "primary" : "secondary"}>
                    {status}
                  </Button>
                </form>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
