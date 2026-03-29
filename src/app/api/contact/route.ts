import { NextResponse } from "next/server";
import { createMessageAction } from "@/lib/actions/contact";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const message = await createMessageAction(json);

    return NextResponse.json({ id: message.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create message." },
      { status: 400 }
    );
  }
}
