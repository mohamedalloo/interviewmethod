import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRole, ROLES } from "@/lib/questions";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function generateStaticParams() {
  return ROLES.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role: slug } = await params;
  const role = getRole(slug);
  if (!role) return {};
  return {
    title: role.metaTitle,
    description: role.metaDescription,
    alternates: { canonical: `/questions/${role.slug}` },
    openGraph: {
      title: role.metaTitle,
      description: role.metaDescription,
      url: `/questions/${role.slug}`,
    },
  };
}

export default async function RoleQuestionsPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role: slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: role.questions.map((q) => ({
          "@type": "Question",
          name: `${role.title} interview question: ${q.q}`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `What the interviewer is really testing: ${q.testing} A strong answer: ${q.strong}`,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Interview questions", item: `${SITE_URL}/questions` },
          { "@type": "ListItem", position: 2, name: role.title, item: `${SITE_URL}/questions/${role.slug}` },
        ],
      },
    ],
  };

  const others = ROLES.filter((r) => r.slug !== role.slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight text-lg">
          interview<span className="text-red-500">method</span>
        </Link>
        <Link
          href="/interview"
          className="rounded-lg bg-red-600 hover:bg-red-500 px-4 py-2 text-sm font-semibold transition-colors"
        >
          Start free interview
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-20">
        <nav className="pt-8 text-xs text-zinc-500">
          <Link href="/questions" className="hover:text-red-400">
            Interview questions
          </Link>{" "}
          / <span className="text-zinc-300">{role.title}</span>
        </nav>

        <section className="py-10">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
            {role.title} interview questions —{" "}
            <span className="text-red-500">graded like a hiring manager</span>
          </h1>
          <p className="text-zinc-400 leading-relaxed">{role.pitch}</p>
        </section>

        <div className="space-y-10">
          {role.questions.map((q, i) => (
            <article
              key={i}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold mb-5 leading-snug">
                <span className="text-red-500 mr-2">{i + 1}.</span>
                &ldquo;{q.q}&rdquo;
              </h2>
              <div className="space-y-5 text-sm leading-relaxed">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-1.5">
                    What they&apos;re actually testing
                  </h3>
                  <p className="text-zinc-300">{q.testing}</p>
                </div>
                <div className="border-l-2 border-red-500 pl-4">
                  <h3 className="text-xs uppercase tracking-widest text-red-400 mb-1.5">
                    The weak answer they hear all day
                  </h3>
                  <p className="text-zinc-400">{q.weak}</p>
                </div>
                <div className="rounded-lg bg-emerald-950/40 border border-emerald-900 p-4">
                  <h3 className="text-xs uppercase tracking-widest text-emerald-400 mb-1.5">
                    What a strong answer sounds like
                  </h3>
                  <p className="text-emerald-100">{q.strong}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-14 rounded-2xl border border-red-500/40 bg-red-500/5 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Now try answering these out loud.
          </h2>
          <p className="text-zinc-400 mb-6">
            A mock {role.title.toLowerCase()} interview with probing follow-ups,
            then the scorecard: verdict, your weak phrases quoted back, every
            answer rewritten stronger. First one&apos;s free.
          </p>
          <Link
            href="/interview"
            className="inline-block rounded-lg bg-red-600 hover:bg-red-500 px-8 py-3.5 font-semibold transition-colors"
          >
            Practice this interview — free
          </Link>
        </section>

        <section className="mt-14">
          <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
            More roles
          </h2>
          <div className="flex flex-wrap gap-2">
            {others.map((r) => (
              <Link
                key={r.slug}
                href={`/questions/${r.slug}`}
                className="text-sm rounded-lg border border-zinc-800 hover:border-red-500/60 px-3 py-1.5 text-zinc-300 transition-colors"
              >
                {r.title}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
