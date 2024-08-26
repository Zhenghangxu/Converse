import { cookies } from "next/headers";
import { ragChat } from "../lib/rag-chat";
import { ChatWrapper } from "@/components/ChatWrapper";
import { lucia } from "../_auth/lucia";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

const Page = async ({ params }: PageProps) => {
  const sessionCookie: any = cookies().get(lucia.sessionCookieName)?.value;
  console.log("sessionCookie", sessionCookie);
  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId: sessionCookie,
  });

  // return <div>Page</div>;
  return <ChatWrapper sessionId={sessionCookie} initialMessages={initialMessages} />;
};

export default Page;
