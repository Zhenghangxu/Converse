import { Icon } from "@iconify/react";
import { marked } from "marked";
import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

marked.use({
  async: true,
  gfm: true,
  breaks: false,
});

export const Message = ({ content, isUserMessage }: MessageProps) => {
  const [parsedHTML, setParsedHTML] = useState("");
  useEffect(() => {
    (async () => {
      const html = await marked.parse(content);
      const cleaned = DOMPurify.sanitize(html);
      setParsedHTML(cleaned);
    })();
  }, [content]);
  useEffect(() => {
    // 1. check if
  }, []);
  return (
    <div className={"p-6 message"}>
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
