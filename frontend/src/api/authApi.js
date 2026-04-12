import client from "./client";

export const registerUser = async (payload) => {
  const { data } = await client.post("/api/v1/auth/register", payload);
  return data;
};

export const verifyOtp = async (payload) => {
  const { data } = await client.post("/api/v1/auth/verify-otp", payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await client.post("/api/v1/auth/login", payload);
  return data;
};
