import axios from "axios";

const DEFAULT_DEV_BASE_URL = "http://192.168.0.100:3000/api";
const envBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

// Expo only exposes env vars prefixed with EXPO_PUBLIC_ to app code.
export const BASE_URL =
  typeof envBaseUrl === "string" && envBaseUrl.trim().length > 0
    ? envBaseUrl.trim()
    : DEFAULT_DEV_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default apiClient;
