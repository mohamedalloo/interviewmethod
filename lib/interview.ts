export type Setup = {
  role: string;
  company: string;
  jobDescription: string;
  interviewType: "behavioral" | "technical" | "screen";
};

export type ChatMessage = { role: "user" | "assistant"; content: string };

export const QUESTION_COUNT = 5;

export const TYPE_LABELS: Record<Setup["interviewType"], string> = {
  behavioral: "Behavioral interview",
  technical: "Technical interview",
  screen: "Recruiter screen",
};

export function interviewerSystemPrompt(setup: Setup): string {
  return `You are a seasoned hiring manager conducting a realistic ${TYPE_LABELS[setup.interviewType].toLowerCase()} for the role of ${setup.role}${setup.company ? ` at ${setup.company}` : ""}.
${setup.jobDescription ? `\nJob description:\n${setup.jobDescription}\n` : ""}
Rules:
- Ask exactly ONE question per message. Never ask two questions at once.
- Sound like a real interviewer: brief, professional, occasionally probing. No coaching, no feedback, no encouragement during the interview — real interviewers don't reveal their read.
- Ask follow-up probes when an answer is vague, evasive, or lacks specifics ("What was YOUR part in that?", "What was the actual number?") — exactly like a skeptical hiring manager would.
- Calibrate questions to the role and job description. For technical interviews, ask questions answerable verbally (system design, tradeoffs, debugging stories), not whiteboard coding.
- Keep each message under 80 words.
- Your first message: greet briefly, then ask the first question.`;
}

export type Scorecard = {
  verdict: "Strong Hire" | "Hire" | "Lean Hire" | "No Hire" | "Strong No Hire";
  verdictReason: string;
  dimensions: { name: string; score: number; note: string }[];
  answerFeedback: {
    question: string;
    whatYouSaid: string;
    brutalFeedback: string;
    weakPhrases: string[];
    strongerAnswer: string;
  }[];
  hiringManagerNotes: string;
  topThreeFixes: string[];
};

export const SCORECARD_SCHEMA = {
  type: "object",
  properties: {
    verdict: {
      type: "string",
      enum: ["Strong Hire", "Hire", "Lean Hire", "No Hire", "Strong No Hire"],
    },
    verdictReason: { type: "string" },
    dimensions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          score: { type: "integer" },
          note: { type: "string" },
        },
        required: ["name", "score", "note"],
        additionalProperties: false,
      },
    },
    answerFeedback: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          whatYouSaid: { type: "string" },
          brutalFeedback: { type: "string" },
          weakPhrases: { type: "array", items: { type: "string" } },
          strongerAnswer: { type: "string" },
        },
        required: [
          "question",
          "whatYouSaid",
          "brutalFeedback",
          "weakPhrases",
          "strongerAnswer",
        ],
        additionalProperties: false,
      },
    },
    hiringManagerNotes: { type: "string" },
    topThreeFixes: { type: "array", items: { type: "string" } },
  },
  required: [
    "verdict",
    "verdictReason",
    "dimensions",
    "answerFeedback",
    "hiringManagerNotes",
    "topThreeFixes",
  ],
  additionalProperties: false,
} as const;

export function scorecardSystemPrompt(setup: Setup): string {
  return `You are a brutally honest hiring manager writing your private post-interview scorecard for a ${setup.role} candidate${setup.company ? ` at ${setup.company}` : ""} (${TYPE_LABELS[setup.interviewType].toLowerCase()}).

This is the scorecard you'd never show the candidate — except today you are showing it, because that's what they paid for. Be specific and unsparing but fair:
- Quote the candidate's actual weak phrases verbatim in weakPhrases (filler, hedging, vague claims like "we improved things a lot").
- brutalFeedback: direct, second person, no softening. Name exactly why the answer fails ("You told me what the team did. I still don't know what YOU did.").
- strongerAnswer: rewrite THEIR answer using only facts they gave (or clearly marked placeholders like [metric]), in tight STAR form, first person, sounding like them but sharper. 60-120 words.
- dimensions: score 1-10 for exactly these five: Communication, Structure, Specificity & Evidence, Role Fit, Red Flags (10 = no red flags).
- hiringManagerNotes: 3-5 sentences written in the voice of an interviewer messaging the recruiter afterwards — the candid version.
- verdict must reflect the actual answers. Most real candidates land in Lean Hire / No Hire. Do not inflate.
- If an answer was genuinely strong, say so plainly — brutal means honest, not uniformly negative.`;
}
