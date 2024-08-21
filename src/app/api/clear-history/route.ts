import { ragChat } from "@/app/lib/rag-chat";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { sessionId } = await req.json();
  try {
    await ragChat.history.deleteMessages({sessionId});
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
  return NextResponse.json({success: true});
};
