export const clearChatHistory = async (sessionId: string) => {
  return fetch("/api/clear-history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId }),
  })
  .then((res) => res.json())
  .catch(() => new Error("Error clearing chat history"));
};
