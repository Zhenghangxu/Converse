import { cookies } from "next/headers";
import { ragChat } from "../lib/rag-chat";
import { redis } from "../lib/redis";
import { ChatWrapper } from "@/components/ChatWrapper";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructURL({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );
  return decodedComponents.join("/");
}

const Page = async ({ params }: PageProps) => {
  const sessionCookie: any = cookies().get("sessionId")?.value;
  const reconstructedURL = reconstructURL({ url: params.url as string[] });

  const sessionId = (reconstructedURL + "--" + sessionCookie).replace(
    /\//g,
    ""
  );
  console.log(reconstructedURL);
  // check if already index
  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    reconstructedURL
  );

  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedURL,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });
    await redis.sadd("indexed-urls", reconstructedURL);
  }

  // return <div>Page</div>;
  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default Page;
