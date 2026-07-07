# interviewmethod

Brutal AI mock interviews with a hiring-manager scorecard — the feedback nobody will give you.

**Live demo:** https://mohamedalloo.github.io/interviewmethod/ (static in-browser demo mode, auto-deployed from `main` via GitHub Actions). For live AI interviews, deploy to a server host (Vercel) with `ANTHROPIC_API_KEY` set — the same codebase does both.

## Positioning (from market research, July 2026)

- **Whitespace:** "Roast" positioning is proven for resumes but unclaimed for interviews. No candidate-side product's hero artifact is a hiring-manager-style scorecard.
- **Tailwind:** Google Interview Warmup retired April 2026 (free-tier vacuum); Yoodli pivoted to enterprise; the copilot cluster (Final Round AI etc.) is reputationally toxic (cheating stigma, 3.6–3.9 Trustpilot, refund complaints) — we position explicitly as the ethical practice tool.
- **Pricing:** One-time credits, not subscription (job seekers are cash-strapped; churn in this category is brutal; competitors are attacked for billing traps).

## Run it

```bash
npm install
ANTHROPIC_API_KEY=sk-ant-... npm run dev
```

Without `ANTHROPIC_API_KEY`, the app runs in **demo mode**: canned interviewer questions and a sample scorecard so the full flow is testable.

## How it works

- `app/page.tsx` — landing page
- `app/interview/page.tsx` — setup → chat interview → scorecard UI
- `app/api/interview/route.ts` — Claude (`claude-opus-4-8`) plays a skeptical hiring manager; one question per turn, 5 questions, probing follow-ups
- `app/api/scorecard/route.ts` — structured-output scorecard: verdict, 5 scored dimensions, weak phrases quoted verbatim, each answer rewritten stronger, "what the interviewer told the recruiter"
- `lib/interview.ts` — prompts + scorecard JSON schema; `lib/demo.ts` — demo-mode data

## Launch checklist

- [ ] Set `ANTHROPIC_API_KEY` and test a live interview end to end
- [ ] Deploy (Vercel: `npx vercel`)
- [ ] Domain: interviewmethod.com is TAKEN (registered 2018, GoDaddy, Cloudflare-parked). interviewmethod.ai and interviewmethod.io appeared AVAILABLE as of 2026-07-06 — or negotiate for the .com
- [ ] Add rate limiting / auth before opening to public traffic (every interview costs API tokens)
- [ ] Stripe payment for credit packs ($19 / 5 interviews, $49 / 20)
- [ ] Shareable scorecard image (og-image per scorecard) — the viral artifact
- [ ] TikTok content: "I let an AI hiring manager roast my interview answers" (proven format: 16M+ views case study for a competitor)
