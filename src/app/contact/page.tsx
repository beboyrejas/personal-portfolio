import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/forms/contact-form";

export default function ContactPage() {
  return (
    <PageShell>
      <section className="py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="Contact"
              title="Start a project, collaboration, or conversation"
              description="Messages go straight into the admin dashboard inbox, making this portfolio practical as well as polished."
            />
            <ContactForm />
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
