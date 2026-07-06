import type { Scorecard } from "./interview";

// Demo mode: used when ANTHROPIC_API_KEY is not set, so the full product flow
// can be exercised without live API calls.
export const DEMO_QUESTIONS = [
  "Thanks for making time today. To start: walk me through a project from the last year that you're most proud of — and be specific about what your individual contribution was.",
  "You said the project went well. What's the actual number — what measurably changed because of your work?",
  "Tell me about a time you disagreed with a decision your manager or team made. What did you do?",
  "Describe the biggest mistake you've made at work in the last two years. What happened afterwards?",
  "Why this role, and why now? What specifically about this position — not the company brochure version.",
  "That's everything from my side. Thanks — we'll generate your scorecard now.",
];

export const DEMO_SCORECARD: Scorecard = {
  verdict: "Lean Hire",
  verdictReason:
    "Competent and likeable, but answers stayed at team level — I finished the interview unsure what this candidate personally owns. Would need a strong reference check to move forward.",
  dimensions: [
    { name: "Communication", score: 7, note: "Clear and composed, but tends to over-explain context before getting to the point." },
    { name: "Structure", score: 5, note: "Answers wandered. Only one response followed a recognizable situation → action → result arc." },
    { name: "Specificity & Evidence", score: 4, note: "Almost no numbers. 'Improved significantly' appeared three times; a hiring manager hears that as 'I don't know the impact.'" },
    { name: "Role Fit", score: 6, note: "Relevant background, but motivation answer was generic enough to paste into any application." },
    { name: "Red Flags", score: 8, note: "No integrity concerns. Mild deflection pattern when pressed on the mistake question." },
  ],
  answerFeedback: [
    {
      question: "Walk me through a project you're most proud of.",
      whatYouSaid: "Described a team project that shipped successfully and 'improved things significantly.'",
      brutalFeedback:
        "You told me what the team did. I still don't know what YOU did. Every time I hear 'we,' I mentally assign the credit to someone else in the room. And 'improved significantly' is not a result — it's an adjective wearing a result's clothes.",
      weakPhrases: ["we basically", "improved significantly", "kind of a team effort"],
      strongerAnswer:
        "The project I'm proudest of is [project]. I owned the [component] end to end. The core problem was [specific problem]. I made the call to [decision], which was contested — [colleague/manager] wanted [alternative]. I shipped it in [timeframe], and it moved [metric] from [X] to [Y]. The part I'd defend hardest is [decision], because [reason].",
    },
    {
      question: "Tell me about a time you disagreed with a decision.",
      whatYouSaid: "Said you raised concerns in a meeting and then went along with the decision.",
      brutalFeedback:
        "This answer is the interview equivalent of beige. Raising a concern once and then complying is the minimum, not a story. I asked this to find out whether you have a spine and judgment about when to use it — I learned neither.",
      weakPhrases: ["I just felt like", "at the end of the day it wasn't my call"],
      strongerAnswer:
        "I disagreed with [decision] because the data showed [evidence]. I put a one-page counter-proposal in front of [decision-maker] within two days, with the tradeoff quantified: [X vs Y]. They kept the original call for [reason], which I accepted — but the follow-up data proved [outcome], and we course-corrected in [timeframe]. I'd rather be overruled on the record than silent.",
    },
  ],
  hiringManagerNotes:
    "Pleasant, coachable, probably a solid B player right now. Couldn't get a single concrete number out of them in 25 minutes, which worries me for a role that reports impact upward. Deflected once on the failure question before giving a real answer. If the other finalists flame out, I'd take another look — but I wouldn't fight for this one. (This is demo output — add an ANTHROPIC_API_KEY to get a real scorecard on your real answers.)",
  topThreeFixes: [
    "Replace every 'we' with 'I' plus your actual contribution — before your next interview, write down the number that proves each project mattered.",
    "Force STAR structure: 15 seconds of situation, then action and result. You're spending 60% of each answer on context.",
    "Prepare ONE disagreement story and ONE failure story with real stakes. Yours are currently too safe to be memorable.",
  ],
};
