import type { PropsWithChildren } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-sand text-ink">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
