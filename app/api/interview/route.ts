import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import {
  interviewerSystemPrompt,
  QUESTION_COUNT,
  type ChatMessage,
  type Setup,
} from "@/lib/interview";
import { DEMO_QUESTIONS } from "@/lib/demo";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { setup, messages } = (await req.json()) as {
    setup: Setup;
    messages: ChatMessage[];
  };

  const questionsAsked = messages.filter((m) => m.role === "assistant").length;
  const isLast = questionsAsked >= QUESTION_COUNT;

  if (!process.env.ANTHROPIC_API_KEY) {
    const idx = Math.min(questionsAsked, DEMO_QUESTIONS.length - 1);
    return NextResponse.json({
      message: DEMO_QUESTIONS[idx],
      done: idx === DEMO_QUESTIONS.length - 1,
      demo: true,
    });
  }

  const client = new Anthropic();
  const system = interviewerSystemPrompt(setup);

  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 1024,
    system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    messages: [
      ...messages,
      ...(isLast
        ? [
            {
              role: "user" as const,
              content:
                "[SYSTEM: The interview is over. Thank the candidate in one short sentence and tell them their scorecard is being generated. Do not ask another question.]",
            },
          ]
        : []),
    ],
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");

  return NextResponse.json({ message: text, done: isLast, demo: false });
}
