# interviewmethod — Growth Playbook

The evidence-backed channels, in priority order, with ready-to-use assets.

---

## 1. TikTok / Reels: "the AI roasted me" (proven format — 16M+ views case study in this exact niche)

The winning structure (from the Nora AI case study): app-demo skit where the AI says something unexpectedly savage + long curiosity hook. The scorecard IS the content — the verdict card is the thumbnail.

**Script A — the founder gets roasted (post this first):**
> Hook (0–2s): "I built an AI that grades job interviews like a real hiring manager. Then I made the mistake of using it on myself."
> Middle: screen-record answering ONE question badly ("we basically improved things a lot"), cut to the scorecard landing: LEAN HIRE. Read the brutal line out loud, deadpan: "'Every time I hear we, I mentally assign the credit to someone else in the room.'"
> Beat: stare at camera.
> CTA: "First interview's free. Link in bio. Bring ice."

**Script B — the couple/friend test:**
> "My friend says he's 'great in interviews.' We ran him through the AI hiring manager. [his face] [the verdict] He has not recovered."

**Script C — the rewrite reveal (value-forward, converts best):**
> "POV: the AI quotes your exact words back to you crossed out... then rewrites your answer so well you get chills. Here's the before and after." (show weak phrase chips → 'Say this instead' panel)

Cadence: 3–5/week, same format, let one creator's face carry it. Expect views ≫ signups (the case study did 16M views → ~1.5K daily visits) — treat it as awareness; SEO catches the demand later.

## 2. Programmatic SEO (SHIPPED: /questions + 10 role pages)

This is how Final Round (~564K visits/mo) and Exponent actually grew. What's live: 10 roles × 5 dissected questions with FAQPage schema. Expansion roadmap, in order of search value:

1. **More roles** (10 → 30): accountant, HR, cybersecurity, DevOps, UX designer, executive assistant, warehouse/ops manager, paralegal, financial analyst, physician assistant…
2. **Per-question pages** once domain authority exists ("tell me about a time you disagreed with your boss — example answers"): each question in `lib/questions.ts` becomes its own URL.
3. **"HireVue practice" content** — candidates viscerally hate one-way video screens (~40% of employers use them); competitors are already farming this keyword family.
4. **"Google Interview Warmup alternative"** page — the tool retired April 2026; startups are actively fighting over its orphaned traffic.

## 3. Launch posts (ready to adapt)

**Product Hunt:**
- Tagline: *"AI mock interviews that grade you like the hiring manager actually does."*
- First comment (maker): the origin story — rejection emails never say why; ChatGPT says every answer is great; here's the scorecard they never show you. End with: the demo needs no signup, and the roast is real.

**Reddit (value-first, no link-dropping — these subs ban self-promo):**
- r/jobs, r/interviews, r/recruitinghell: post the CONTENT, not the product — "I'm a hiring manager. Here are the 5 phrases that quietly kill candidates in behavioral interviews" (pull from the question bank's weak-answer patterns). Product mention only if asked / in profile.
- r/nursing, r/sales, r/Teachers, r/fednews: the vertical question pages are the shareable asset — "what nurse managers are actually testing in scenario questions."
- Never astroturf. This market's Reddit is already burned by copilot-tool spam; being the honest one is the position.

## 4. The share loop

The downloadable verdict card (shipped) is the seed. Next iterations:
- Auto-generate an og-image per scorecard so a pasted link previews the verdict.
- "I got Strong Hire on attempt 4" streak framing — the retry loop is the product loop.
- LinkedIn angle: people post "I let an AI hiring manager grade me — humbling" with the card. Add a subtle URL to the card corner (already on it).

## 5. Monetization switch-on (when traffic justifies it)

1. Stripe Payment Links (fastest): $19 / 5 credits, $49 / 20 credits. Gate `/api/interview` behind a credit check (simple KV/DB counter keyed by emailed license code — no auth system needed for v1).
2. Deploy the live-AI version to Vercel with `ANTHROPIC_API_KEY` + rate limiting (IP-based, e.g. 3 free/day) BEFORE any traffic push — every interview costs tokens.
3. Cost note: a 5-question interview + scorecard ≈ 15–25k tokens ≈ $0.40–0.80 at Opus pricing — fine at $3.80/interview revenue ($19/5), tight for free tier. Consider Sonnet for the interviewer turns and Opus for the scorecard if free-tier volume spikes.

## 6. KPIs for the first 30 days

- Question-bank pages indexed (Search Console) and first non-brand impressions
- Free interview completion rate (started → scorecard) — target >60%
- Verdict-card download rate — the share-intent proxy
- One TikTok >100K views (format validation)
- 100 completed interviews → read every transcript; the weak-answer patterns are next month's content
