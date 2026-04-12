import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 15000,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("rc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong"
  );
};

export default client;
