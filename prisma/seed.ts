import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set before seeding.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN" },
    create: {
      email,
      name: "Portfolio Admin",
      passwordHash,
      role: "ADMIN"
    }
  });

  const projects = [
    {
      title: "Studio Commerce",
      slug: "studio-commerce",
      excerpt: "Headless commerce storefront with editorial landing pages.",
      description:
        "A conversion-focused storefront built with a modular design system, a CMS-backed marketing layer, and a streamlined checkout experience.",
      stack: "Next.js, TypeScript, Tailwind CSS, Stripe",
      repository: "https://github.com/example/studio-commerce",
      demoUrl: "https://example.com/studio-commerce",
      featured: true,
      published: true
    },
    {
      title: "Analytics Pulse",
      slug: "analytics-pulse",
      excerpt: "Operational dashboard surfacing product and revenue trends.",
      description:
        "An internal analytics platform that turns fragmented data into actionable reporting through clear KPIs, cohort views, and trend monitoring.",
      stack: "Next.js, Prisma, SQLite, Charting",
      repository: "https://github.com/example/analytics-pulse",
      featured: true,
      published: true
    }
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project
    });
  }

  const posts = [
    {
      title: "Designing Systems That Age Well",
      slug: "designing-systems-that-age-well",
      excerpt: "A practical framework for building products that stay maintainable.",
      content:
        "Great systems are intentionally boring in the right places. They make common paths obvious, leave room for growth, and reduce the cognitive cost of future change.",
      published: true,
      publishedAt: new Date()
    },
    {
      title: "From Shipping Features to Shipping Confidence",
      slug: "shipping-features-to-shipping-confidence",
      excerpt: "How product teams can increase speed by investing in clarity.",
      content:
        "Confidence is the real accelerator. When architecture, ownership, and observability are in place, product teams stop hesitating and start compounding velocity.",
      published: true,
      publishedAt: new Date()
    }
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
