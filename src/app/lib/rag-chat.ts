import { RAGChat, togetherai } from "@upstash/rag-chat";
import { redis } from "./redis";
import { Personas } from "../_chat_utils/chat";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ragChat = new RAGChat({
  model: togetherai("meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo", {
    apiKey: process.env.TOGETHER_AI_API_KEY,
    maxTokens: 800,
    streamUsage: true,
  }),
  redis: redis,
  ratelimit: new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "10 s"),
  }),
  debug: true,
  streaming: true,
  promptFn: ({ context, question, chatHistory }) =>
    Personas({ context, question, chatHistory, role: "medicalAssistant" }),
});
