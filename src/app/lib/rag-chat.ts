import { RAGChat, togetherai } from "@upstash/rag-chat";
import { redis } from "./redis";

export const ragChat = new RAGChat({
  model: togetherai("meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo", {
    apiKey: process.env.TOGETHER_AI_API_KEY,
    maxTokens: 1000,
    streamUsage: true,
  }),
  redis: redis,
  debug: true,
  streaming: true,
  promptFn: ({ context, question, chatHistory }) =>
    `You are an AI Assistant designed to interact with users naturally. Avoid technical jargon unless it’s related to the context.
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
