import { RAGChat, togetherai } from "@upstash/rag-chat";
import { redis } from "./redis";

export const ragChat = new RAGChat({
  model: togetherai("meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo", {
    apiKey: process.env.NEXT_PUBLIC_TOGETHER_AI_API_KEY,
  }),
  redis: redis,
  debug: true,
  promptFn: ({ context, question, chatHistory }) =>
    `You are an AI Assistant designed to interact with users naturally. Avoid technical jargon unless it’s related to the context. Be concise and avoid filler. Avoid reapting what is already in the history.
      ------
      Chat history:
      ${chatHistory}
      ------
      Context:
      ${context}
      ------
      Question: ${question}
      Answer:`,
});
