import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const FAQS = [
  {
    q: "How is this different from asking ChatGPT to interview me?",
    a: "Generic chatbots are sycophantic — they tell you your answer was 'great!' and move on. interviewmethod runs a realistic interview under pressure (one question at a time, skeptical follow-ups when you're vague, no mid-interview coaching), then grades you the way an actual hiring manager does: a hire/no-hire verdict, five scored dimensions, your weak phrases quoted verbatim, and each answer rewritten stronger.",
  },
  {
    q: "What is the hiring-manager scorecard?",
    a: "It's the private document real interviewers write after your interview and never show you: an overall verdict (Strong Hire to Strong No Hire), scores for Communication, Structure, Specificity & Evidence, Role Fit, and Red Flags, the candid note the interviewer sends the recruiter, and the three things to fix before your next interview.",
  },
  {
    q: "Is this a cheating tool for live interviews?",
    a: "No — the opposite. interviewmethod never feeds you answers during a real interview, and never will. It's a practice tool: brutal, specific feedback so you're genuinely better when the real interview happens.",
  },
  {
    q: "How much does it cost?",
    a: "Your first full interview and scorecard are free with no signup. After that it's one-time credit packs — $19 for 5 interviews or $49 for 20 — because job seekers don't need another subscription. Credits never expire.",
  },
  {
    q: "What interview types does it support?",
    a: "Behavioral interviews, verbal technical interviews (system design, tradeoffs, debugging stories), and recruiter screens. Paste the job description and the questions calibrate to the actual role.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The scorecard said 'you told me what the team did — I still don't know what YOU did.' I'd done twelve real interviews without an offer and nobody had told me that. Changed every answer I give.",
    who: "Product manager, laid off in a 2025 reduction",
  },
  {
    quote:
      "Honestly it stung. Then I read the rewritten answers and realized they were my stories — just told the way I should have been telling them all along.",
    who: "Senior engineer, career switcher",
  },
  {
    quote:
      "I used the free interview the night before a final round. The 'what the interviewer told the recruiter' section is exactly the voice in the room after you leave it. I went in knowing what they'd be writing down.",
    who: "Marketing lead, now hired",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "interviewmethod",
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "AI mock interviews with brutally honest feedback and a hiring-manager scorecard: hire/no-hire verdict, five scored dimensions, weak phrases quoted verbatim, and every answer rewritten stronger.",
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "First full interview and scorecard free, no signup.",
        },
        {
          "@type": "Offer",
          price: "19.00",
          priceCurrency: "USD",
          description: "Interview pack: 5 full interviews, credits never expire.",
        },
        {
          "@type": "Offer",
          price: "49.00",
          priceCurrency: "USD",
          description: "Offer-ready pack: 20 full interviews, credits never expire.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <header className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="font-bold tracking-tight text-lg">
          interview<span className="text-red-500">method</span>
        </span>
        <nav className="flex items-center gap-5">
          <Link
            href="/questions"
            className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Question bank
          </Link>
          <Link
            href="/interview"
            className="rounded-lg bg-red-600 hover:bg-red-500 px-4 py-2 text-sm font-semibold transition-colors"
          >
            Start free interview
          </Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="py-20 text-center max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-red-400 mb-4">
            AI mock interviews · hiring-manager scorecard
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
            The interview feedback{" "}
            <span className="text-red-500">nobody will give you.</span>
          </h1>
          <p className="text-lg text-zinc-400 mb-4 leading-relaxed">
            ChatGPT says your answer was &ldquo;great!&rdquo; It wasn&apos;t. Rejection
            emails say they &ldquo;went with another candidate.&rdquo; They don&apos;t say why.
          </p>
          <p className="text-lg text-zinc-300 mb-10 leading-relaxed">
            interviewmethod runs a realistic mock interview, then shows you the one
            document candidates never see: <strong>the hiring manager&apos;s private
            scorecard</strong> — verdict, scores, your weak phrases quoted back at you,
            and every answer rewritten stronger.
          </p>
          <Link
            href="/interview"
            className="inline-block rounded-lg bg-red-600 hover:bg-red-500 px-8 py-4 font-semibold text-lg transition-colors"
          >
            Get roasted — first interview free
          </Link>
          <p className="text-xs text-zinc-500 mt-4">
            5 questions · 15 minutes · no signup for your first run
          </p>
        </section>

        {/* Scorecard preview */}
        <section className="py-12">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-10 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
              Sample scorecard excerpt
            </p>
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-amber-500 text-zinc-950 font-bold px-3 py-1 rounded text-sm">
                LEAN HIRE
              </span>
              <span className="text-sm text-zinc-400">Senior Product Manager</span>
            </div>
            <blockquote className="border-l-2 border-red-500 pl-4 text-sm text-red-300 mb-4">
              &ldquo;You told me what the team did. I still don&apos;t know what YOU did.
              Every time I hear &lsquo;we,&rsquo; I mentally assign the credit to someone
              else in the room.&rdquo;
            </blockquote>
            <div className="flex flex-wrap gap-2 mb-5">
              {["we basically", "improved significantly", "kind of a team effort"].map(
                (p) => (
                  <span
                    key={p}
                    className="text-xs bg-red-950/60 text-red-300 border border-red-900 rounded px-2 py-0.5 line-through"
                  >
                    &ldquo;{p}&rdquo;
                  </span>
                )
              )}
            </div>
            <p className="text-sm text-zinc-300 italic">
              &ldquo;Pleasant, coachable, probably a solid B player. Couldn&apos;t get a
              single concrete number out of them in 25 minutes… I wouldn&apos;t fight for
              this one.&rdquo;
              <span className="text-zinc-500 not-italic">
                {" "}
                — what the interviewer told the recruiter
              </span>
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              n: "1",
              t: "Paste the job",
              d: "Role, company, job description. The interviewer calibrates questions to the actual position — including the skeptical follow-ups.",
            },
            {
              n: "2",
              t: "Do the interview",
              d: "Five questions, realistic pressure, probing follow-ups when you're vague. No coaching mid-interview — real interviewers don't reveal their read.",
            },
            {
              n: "3",
              t: "Read your scorecard",
              d: "Hire/no-hire verdict, five scored dimensions, your weak phrases quoted verbatim, and each answer rewritten the way a strong candidate would say it.",
            },
          ].map((s) => (
            <div key={s.n} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-sm mb-4">
                {s.n}
              </div>
              <h3 className="font-semibold mb-2">{s.t}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </section>

        {/* Positioning / trust */}
        <section className="py-12 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Practice tool. Not a cheating tool.</h2>
          <p className="text-zinc-400 leading-relaxed">
            We don&apos;t whisper answers in your ear during real interviews, and we never
            will. Employers are catching copilot users and bringing back in-person rounds
            because of them. The only thing that survives a real interview is being
            genuinely better — that&apos;s what brutal practice is for.
          </p>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            It stings. Then it works.
          </h2>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.who}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col"
              >
                <blockquote className="text-sm text-zinc-200 leading-relaxed italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="text-xs text-zinc-500 mt-4">
                  — {t.who}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="text-center text-xs text-zinc-600 mt-6">
            Composite quotes from pre-launch testing sessions. Verified reviews will
            replace these as early-access users opt in.
          </p>
        </section>

        {/* Pricing */}
        <section className="py-16" id="pricing">
          <h2 className="text-3xl font-bold text-center mb-3">
            Pay per interview. No subscription.
          </h2>
          <p className="text-center text-zinc-400 mb-10">
            You&apos;re job hunting — the last thing you need is another monthly charge.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                name: "First interview",
                price: "Free",
                items: ["Full mock interview", "Complete scorecard", "No signup"],
                cta: "Start now",
                featured: false,
              },
              {
                name: "Interview pack",
                price: "$19",
                items: [
                  "5 full interviews",
                  "All interview types",
                  "Job-description targeting",
                  "Credits never expire",
                ],
                cta: "Get 5 interviews",
                featured: true,
              },
              {
                name: "Offer-ready",
                price: "$49",
                items: [
                  "20 full interviews",
                  "Progress across sessions",
                  "Priority scorecards",
                  "Credits never expire",
                ],
                cta: "Go all in",
                featured: false,
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-6 flex flex-col ${
                  p.featured
                    ? "border-red-500 bg-red-500/5"
                    : "border-zinc-800 bg-zinc-900/40"
                }`}
              >
                <h3 className="font-semibold text-sm text-zinc-400 mb-1">{p.name}</h3>
                <div className="text-3xl font-bold mb-4">{p.price}</div>
                <ul className="space-y-2 text-sm text-zinc-300 mb-6 flex-1">
                  {p.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-red-400">✓</span> {i}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/interview"
                  className={`rounded-lg text-center font-semibold py-2.5 text-sm ${
                    p.featured
                      ? "bg-red-600 hover:bg-red-500"
                      : "border border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-zinc-500 mt-6">
            Payments coming soon — everything is free during early access.
          </p>
        </section>

        {/* FAQ */}
        <section className="py-16 max-w-3xl mx-auto" id="faq">
          <h2 className="text-3xl font-bold text-center mb-10">
            Questions candidates ask
          </h2>
          <div className="divide-y divide-zinc-800 border-y border-zinc-800">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer font-semibold text-zinc-100 list-none flex justify-between items-center gap-4">
                  {f.q}
                  <span className="text-red-400 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="text-sm text-zinc-400 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="py-10 border-t border-zinc-900">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-zinc-500 mb-4">
            {[
              ["software-engineer", "Software engineer questions"],
              ["product-manager", "Product manager questions"],
              ["registered-nurse", "Nursing interview questions"],
              ["sales-account-executive", "Sales interview questions"],
              ["teacher", "Teacher interview questions"],
              ["federal-to-private", "Federal-to-private interviews"],
            ].map(([slug, label]) => (
              <Link
                key={slug}
                href={`/questions/${slug}`}
                className="hover:text-red-400 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="text-center text-xs text-zinc-600">
            © 2026 interviewmethod. Brutal on purpose.
          </p>
        </footer>
      </main>
    </div>
  );
}
