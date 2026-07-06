"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ChatMessage, Scorecard, Setup } from "@/lib/interview";
import { QUESTION_COUNT } from "@/lib/interview";

type Phase = "setup" | "interview" | "grading" | "scorecard";

const VERDICT_COLORS: Record<Scorecard["verdict"], string> = {
  "Strong Hire": "bg-emerald-500",
  Hire: "bg-emerald-600",
  "Lean Hire": "bg-amber-500",
  "No Hire": "bg-red-500",
  "Strong No Hire": "bg-red-700",
};

export default function InterviewPage() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [setup, setSetup] = useState<Setup>({
    role: "",
    company: "",
    jobDescription: "",
    interviewType: "behavioral",
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [demo, setDemo] = useState(false);
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function callInterviewer(history: ChatMessage[]) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setup, messages: history }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setDemo(data.demo);
      const next = [...history, { role: "assistant" as const, content: data.message }];
      setMessages(next);
      if (data.done) {
        setPhase("grading");
        await generateScorecard(next);
      }
    } catch {
      setError("Something went wrong talking to the interviewer. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function generateScorecard(history: ChatMessage[]) {
    try {
      const res = await fetch("/api/scorecard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setup, messages: history }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setScorecard(data.scorecard);
      setPhase("scorecard");
    } catch {
      setError("Scorecard generation failed. Refresh to retry.");
    }
  }

  function startInterview(e: React.FormEvent) {
    e.preventDefault();
    if (!setup.role.trim()) return;
    setPhase("interview");
    callInterviewer([]);
  }

  function sendAnswer(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const next = [...messages, { role: "user" as const, content: input.trim() }];
    setMessages(next);
    setInput("");
    callInterviewer(next);
  }

  const questionsAsked = messages.filter((m) => m.role === "assistant").length;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight text-lg">
          interview<span className="text-red-500">method</span>
        </Link>
        {phase === "interview" && (
          <span className="text-sm text-zinc-400">
            Question {Math.min(questionsAsked, QUESTION_COUNT)} of {QUESTION_COUNT}
          </span>
        )}
        {demo && (
          <span className="text-xs px-2 py-1 rounded bg-amber-900/50 text-amber-300 border border-amber-700">
            Demo mode — set ANTHROPIC_API_KEY for live interviews
          </span>
        )}
      </header>

      {phase === "setup" && (
        <main className="max-w-xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-2">Set up your mock interview</h1>
          <p className="text-zinc-400 mb-8">
            The interview feels real. The feedback is the part nobody else will give you.
          </p>
          <form onSubmit={startInterview} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Role you&apos;re interviewing for *</label>
              <input
                className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2.5 focus:outline-none focus:border-red-500"
                placeholder="e.g. Senior Product Manager"
                value={setup.role}
                onChange={(e) => setSetup({ ...setup, role: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Company (optional)</label>
              <input
                className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2.5 focus:outline-none focus:border-red-500"
                placeholder="e.g. Stripe"
                value={setup.company}
                onChange={(e) => setSetup({ ...setup, company: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Paste the job description (optional, sharpens questions)</label>
              <textarea
                className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2.5 h-28 focus:outline-none focus:border-red-500"
                value={setup.jobDescription}
                onChange={(e) => setSetup({ ...setup, jobDescription: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Interview type</label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    ["behavioral", "Behavioral"],
                    ["technical", "Technical"],
                    ["screen", "Recruiter screen"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSetup({ ...setup, interviewType: value })}
                    className={`rounded-lg border px-3 py-2.5 text-sm ${
                      setup.interviewType === value
                        ? "border-red-500 bg-red-500/10 text-red-300"
                        : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-red-600 hover:bg-red-500 font-semibold py-3 transition-colors"
            >
              Start the interview
            </button>
            <p className="text-xs text-zinc-500 text-center">
              {QUESTION_COUNT} questions · ~15 minutes · scorecard at the end
            </p>
          </form>
        </main>
      )}

      {(phase === "interview" || phase === "grading") && (
        <main className="max-w-2xl mx-auto px-6 py-8 pb-40">
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-red-600/90 text-white rounded-br-sm"
                      : "bg-zinc-800 text-zinc-100 rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && phase === "interview" && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-zinc-400 animate-pulse">
                  Interviewer is thinking…
                </div>
              </div>
            )}
            {phase === "grading" && (
              <div className="text-center py-10">
                <div className="text-lg font-semibold animate-pulse">
                  The hiring manager is writing your scorecard…
                </div>
                <p className="text-sm text-zinc-500 mt-2">
                  The version they never show candidates.
                </p>
              </div>
            )}
            {error && <div className="text-sm text-red-400 text-center">{error}</div>}
            <div ref={bottomRef} />
          </div>
          {phase === "interview" && (
            <form
              onSubmit={sendAnswer}
              className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 border-t border-zinc-800 px-6 py-4"
            >
              <div className="max-w-2xl mx-auto flex gap-3">
                <textarea
                  className="flex-1 rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2.5 h-20 text-sm focus:outline-none focus:border-red-500 resize-none"
                  placeholder="Answer out loud in your head, then type it the way you'd say it…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendAnswer(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 px-5 font-semibold text-sm"
                >
                  Send
                </button>
              </div>
            </form>
          )}
        </main>
      )}

      {phase === "scorecard" && scorecard && (
        <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-zinc-500 mb-3">
              Hiring manager scorecard · {setup.role}
            </p>
            <span
              className={`inline-block ${VERDICT_COLORS[scorecard.verdict]} text-white text-2xl font-bold px-6 py-2.5 rounded-lg`}
            >
              {scorecard.verdict}
            </span>
            <p className="text-zinc-400 mt-4 max-w-lg mx-auto">{scorecard.verdictReason}</p>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scorecard.dimensions.map((d) => (
              <div key={d.name} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-medium text-sm">{d.name}</span>
                  <span className={`font-bold ${d.score >= 7 ? "text-emerald-400" : d.score >= 5 ? "text-amber-400" : "text-red-400"}`}>
                    {d.score}/10
                  </span>
                </div>
                <div className="h-1.5 rounded bg-zinc-800 mb-2">
                  <div
                    className={`h-1.5 rounded ${d.score >= 7 ? "bg-emerald-500" : d.score >= 5 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${d.score * 10}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-400">{d.note}</p>
              </div>
            ))}
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
            <h2 className="font-semibold mb-2 text-sm uppercase tracking-wide text-zinc-400">
              What the interviewer told the recruiter
            </h2>
            <p className="text-sm text-zinc-200 italic leading-relaxed">
              &ldquo;{scorecard.hiringManagerNotes}&rdquo;
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="font-semibold text-lg">Answer-by-answer breakdown</h2>
            {scorecard.answerFeedback.map((a, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
                <p className="font-medium text-sm text-zinc-300">Q: {a.question}</p>
                <p className="text-xs text-zinc-500">You: {a.whatYouSaid}</p>
                <div className="border-l-2 border-red-500 pl-3">
                  <p className="text-sm text-red-300">{a.brutalFeedback}</p>
                </div>
                {a.weakPhrases.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {a.weakPhrases.map((p) => (
                      <span key={p} className="text-xs bg-red-950/60 text-red-300 border border-red-900 rounded px-2 py-0.5 line-through">
                        &ldquo;{p}&rdquo;
                      </span>
                    ))}
                  </div>
                )}
                <div className="rounded-lg bg-emerald-950/40 border border-emerald-900 p-3">
                  <p className="text-xs font-semibold text-emerald-400 mb-1">Say this instead:</p>
                  <p className="text-sm text-emerald-100 leading-relaxed">{a.strongerAnswer}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
            <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide text-zinc-400">
              Fix these three things before your next interview
            </h2>
            <ol className="space-y-2 list-decimal list-inside text-sm text-zinc-200">
              {scorecard.topThreeFixes.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ol>
          </section>

          <div className="flex gap-3 justify-center pb-10">
            <button
              onClick={() => {
                setMessages([]);
                setScorecard(null);
                setPhase("setup");
              }}
              className="rounded-lg bg-red-600 hover:bg-red-500 font-semibold px-6 py-3 text-sm"
            >
              Run it again
            </button>
            <button
              onClick={() => window.print()}
              className="rounded-lg border border-zinc-700 hover:border-zinc-500 font-semibold px-6 py-3 text-sm"
            >
              Save scorecard
            </button>
          </div>
        </main>
      )}
    </div>
  );
}
