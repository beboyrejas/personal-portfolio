import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/forms/login-form";
import { Container } from "@/components/layout/container";

export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center bg-sand py-24">
      <Container>
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ember">Admin access</p>
            <h1 className="font-display text-4xl text-ink">Sign in to your dashboard</h1>
            <p className="text-ink/70">Use the seeded admin credentials from your environment variables.</p>
          </div>
          <LoginForm />
        </div>
      </Container>
    </div>
  );
}
