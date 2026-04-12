import client from "./client";

export const getCommunities = async () => {
  const { data } = await client.get("/api/v1/community");
  return data;
};

export const joinCommunity = async (communityId, role = "MEMBER") => {
  const { data } = await client.post("/api/v1/community/join", { communityId, role });
  return data;
};

export const sendCommunityMessage = async (payload) => {
  const { data } = await client.post("/api/v1/community/message", payload);
  return data;
};

export const getCommunityMessages = async (communityId) => {
  const { data } = await client.get(`/api/v1/community/messages?communityId=${communityId}`);
  return data;
};
