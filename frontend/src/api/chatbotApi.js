import client from "./client";

export const askChatbot = async (query) => {
  const { data } = await client.post("/api/v1/chatbot/query", { query });
  return data;
};
