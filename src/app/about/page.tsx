import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="About"
              title="Hi, I'm Raymond Rejas."
              description="I build thoughtful digital experiences grounded in engineering, usability, and continuous improvement."
            />
            <div className="space-y-6 text-lg leading-9 text-ink/70">
              <p>
                I’m an Information Technology graduate from Xavier University Ateneo de Cagayan with experience in full-stack
                development, UI/UX design, and quality assurance.
              </p>
              <p>
                I enjoy solving real-world problems through technology and building systems that are both functional and user-friendly.
                My background includes working with modern tools like React, Node.js, and databases, along with hands-on experience in
                testing and improving product quality.
              </p>
              <p>
                I’m passionate about continuous learning, teamwork, and delivering solutions that create real impact.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
