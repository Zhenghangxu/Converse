import { ragChat } from "@/app/lib/rag-chat";
import { PrepareChatResult } from "@upstash/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { messages, sessionId } = await req.json();
  const lastMessage = messages[messages.length - 1].content;
  const response = await ragChat.chat(lastMessage, {
    streaming: true,
    sessionId: sessionId,
    topK: 30,
    onContextFetched: (context:PrepareChatResult) => {
      console.log("Context fetched", context);
      // only return top 5 results
      return context.slice(0, 5);
    }
  });
  return aiUseChatAdapter(response);
};
