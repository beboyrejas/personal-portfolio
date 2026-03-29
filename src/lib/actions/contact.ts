"use server";

import { prisma } from "@/lib/db/prisma";
import { messageSchema } from "@/lib/validators/message";

export async function createMessageAction(input: unknown) {
  const parsed = messageSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid message.");
  }

  return prisma.message.create({
    data: parsed.data
  });
}
