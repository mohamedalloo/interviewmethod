import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import {
  scorecardSystemPrompt,
  SCORECARD_SCHEMA,
  type ChatMessage,
  type Setup,
} from "@/lib/interview";
import { DEMO_SCORECARD } from "@/lib/demo";

export const maxDuration = 120;

export async function POST(req: Request) {
  const { setup, messages } = (await req.json()) as {
    setup: Setup;
    messages: ChatMessage[];
  };

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ scorecard: DEMO_SCORECARD, demo: true });
  }

  const client = new Anthropic();

  const transcript = messages
    .map((m) => `${m.role === "assistant" ? "INTERVIEWER" : "CANDIDATE"}: ${m.content}`)
    .join("\n\n");

  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 16000,
    system: scorecardSystemPrompt(setup),
    output_config: {
      format: {
        type: "json_schema",
        schema: SCORECARD_SCHEMA,
      },
    },
    messages: [
      {
        role: "user",
        content: `Here is the full interview transcript. Write your scorecard.\n\n${transcript}`,
      },
    ],
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");

  return NextResponse.json({ scorecard: JSON.parse(text), demo: false });
}
