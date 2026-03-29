"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send your message.");
      }

      setStatus("success");
      setFeedback("Message sent. I’ll get back to you soon.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[2rem] bg-white p-8 shadow-card">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          placeholder="Your name"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          required
        />
        <Input
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          required
        />
      </div>
      <Input
        placeholder="Subject"
        value={form.subject}
        onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
        required
      />
      <Textarea
        placeholder="Tell me about your project, team, or idea"
        rows={6}
        value={form.message}
        onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
        required
      />
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-ink/60">{feedback || "Responses are stored in the admin inbox."}</p>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send message"}
        </Button>
      </div>
    </form>
  );
}
