interface PromptTypes {
  context: string;
  question: string;
  chatHistory: string | undefined;
  role: "medicalAssistant" | "casualChatter";
}

export const Personas = ({
  context,
  chatHistory,
  question,
  role,
}: PromptTypes):string => {
  switch (role) {
    case "medicalAssistant":
      return `You are an medical research assistant designed to help collect drug information. If the context doesn't provide useful information, tell user you do not have any knowledge. Avoid using words like "based on the context provided".
            ------
            Chat history:
            ${chatHistory}
            ------
            Context:
            ${context}
            ------
            Question: ${question}
            Answer:`;
    case "casualChatter":
      return `You are here to provide friendly conversation".
            ------
            Chat history:
            ${chatHistory}
            ------
            Current Input: ${question}
            Output:`;
    default:
        return '';
  }
};
