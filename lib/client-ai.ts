// Direct-from-browser Anthropic calls for the static deploy (BYOK mode).
// The user's key lives in localStorage only and is sent only to api.anthropic.com.
import {
  interviewerSystemPrompt,
  scorecardSystemPrompt,
  SCORECARD_SCHEMA,
  type ChatMessage,
  type Scorecard,
  type Setup,
} from "./interview";

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-opus-4-8";
export const KEY_STORAGE = "im_anthropic_key";

export function getStoredKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(KEY_STORAGE) || "";
}

export function setStoredKey(key: string) {
  if (key) localStorage.setItem(KEY_STORAGE, key.trim());
  else localStorage.removeItem(KEY_STORAGE);
}

async function callAnthropic(
  key: string,
  body: Record<string, unknown>
): Promise<string> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({ model: MODEL, ...body }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(
      err?.error?.message || `Anthropic API error ${res.status}`
    );
  }
  const data = await res.json();
  return (data.content as { type: string; text?: string }[])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");
}

export async function clientInterviewer(
  key: string,
  setup: Setup,
  messages: ChatMessage[],
  isLast: boolean
): Promise<string> {
  return callAnthropic(key, {
    max_tokens: 1024,
    system: interviewerSystemPrompt(setup),
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
}

export async function clientScorecard(
  key: string,
  setup: Setup,
  messages: ChatMessage[]
): Promise<Scorecard> {
  const transcript = messages
    .map(
      (m) =>
        `${m.role === "assistant" ? "INTERVIEWER" : "CANDIDATE"}: ${m.content}`
    )
    .join("\n\n");
  const text = await callAnthropic(key, {
    max_tokens: 16000,
    system: scorecardSystemPrompt(setup),
    output_config: {
      format: { type: "json_schema", schema: SCORECARD_SCHEMA },
    },
    messages: [
      {
        role: "user",
        content: `Here is the full interview transcript. Write your scorecard.\n\n${transcript}`,
      },
    ],
  });
  return JSON.parse(text) as Scorecard;
}
