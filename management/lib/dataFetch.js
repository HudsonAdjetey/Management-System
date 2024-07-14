import axios from "axios";

export const api = axios.create({
  // for localhost
  baseURL: "http://localhost:5060",
  // for production
  // baseURL: "https://your-production-url",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: false, // for cross-domain requests
});
