import client from "./client";

export const getNotifications = async (unreadOnly = false) => {
  const { data } = await client.get(`/api/v1/notifications?unreadOnly=${unreadOnly}`);
  return data;
};

export const markNotificationRead = async (id) => {
  const { data } = await client.put(`/api/v1/notifications/${id}/read`);
  return data;
};
