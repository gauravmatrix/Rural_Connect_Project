import client from "./client";

export const createComplaint = async (payload) => {
  const { data } = await client.post("/api/v1/complaints", payload);
  return data;
};

export const getMyComplaints = async () => {
  const { data } = await client.get("/api/v1/complaints/my");
  return data;
};

export const getComplaintDetails = async (id) => {
  const { data } = await client.get(`/api/v1/complaints/${id}`);
  return data;
};

export const pradhanAction = async (id, action, body = {}) => {
  const { data } = await client.put(`/api/v1/complaints/${id}/${action}`, body);
  return data;
};
