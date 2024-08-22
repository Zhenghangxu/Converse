import { Icon } from "@iconify/react";
import { marked } from "marked";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}
export const Message = ({ content, isUserMessage}: MessageProps) => {
  const [parsedHTML, setParsedHTML] = useState("Parsing HTML...");
  useEffect(() => {
    (async () => {
      const html = await marked(content);
      const cleaned = DOMPurify.sanitize(html);
      setParsedHTML(cleaned);
    })();
  }, [content]);
  useEffect(() => {
    // 1. check if 
  }, []);
  return (
    <div className={"p-6"}>
      <div
        className={`max-w-3xl mx-auto flex items-start justify-start ${
          isUserMessage ? "flex-row-reverse" : ""
        } gap-2.5`}
      >
        <div className="bg-white dark:bg-gray-500 p-3 rounded-[50%] border-neutral-300/50 border-2">
          <Icon
            icon={`${
              isUserMessage
                ? "fluent:person-20-regular"
                : "fluent:bot-20-regular"
            }`}
            width="1.5em"
            height="1.5em"
            className="text-black dark:text-white"
          />
        </div>
        <div
          className={`p-3 rounded-md items-center gap-2 ${
            isUserMessage ? "bg-green-400" : "bg-blue-400"
          }`}
          dangerouslySetInnerHTML={{
            __html: parsedHTML as string | TrustedHTML,
          }}
        />
      </div>
    </div>
  );
};
