import Link from "next/link";
import type { Metadata } from "next";
import { ROLES } from "@/lib/questions";

export const metadata: Metadata = {
  title: "Interview questions by role — with brutally honest answer feedback",
  description:
    "Real interview questions for 10 roles — software engineering, nursing, sales, teaching, federal-to-private and more — with what interviewers actually test, the weak answers they hear all day, and strong rewrites.",
  alternates: { canonical: "/questions" },
};

export default function QuestionsHub() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
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

      <main className="max-w-5xl mx-auto px-6 pb-20">
        <section className="py-14 max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-red-400 mb-4">
            The question bank
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            Interview questions by role — graded like a hiring manager.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Not another list of questions with cheerful sample answers. For every
            question: what the interviewer is <em>actually</em> testing, the weak
            answer they hear all day, and what a strong answer sounds like. Then
            practice against the real thing.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-4">
          {ROLES.map((r) => (
            <Link
              key={r.slug}
              href={`/questions/${r.slug}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-red-500/60 transition-colors group"
            >
              <h2 className="font-semibold text-lg mb-2 group-hover:text-red-400 transition-colors">
                {r.title} interview questions
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                {r.pitch}
              </p>
              <p className="text-xs text-red-400 mt-4">
                {r.questions.length} questions, dissected →
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-16 rounded-2xl border border-red-500/40 bg-red-500/5 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Reading answers is the easy part.
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Saying them out loud, under pressure, to an interviewer who probes when
            you&apos;re vague — that&apos;s the part that decides offers. Your first
            mock interview and scorecard are free.
          </p>
          <Link
            href="/interview"
            className="inline-block rounded-lg bg-red-600 hover:bg-red-500 px-8 py-3.5 font-semibold transition-colors"
          >
            Get roasted — free
          </Link>
        </section>
      </main>
    </div>
  );
}
