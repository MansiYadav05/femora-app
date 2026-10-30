import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

// Shared Axios client
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const GUEST_SESSION_KEY = "femora_guest_session";

function getGuestSessionId(): string {
  let guestId = localStorage.getItem(GUEST_SESSION_KEY);
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem(GUEST_SESSION_KEY, guestId);
  }
  return guestId;
}

// Interceptor for attaching auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("femora_auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers) {
      config.headers["X-Guest-Session"] = getGuestSessionId();
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Standard ApiResponse interface
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

// Utility simulator delay for mock service responses
export const simulateDelay = (ms: number = 350) =>
  new Promise((resolve) => setTimeout(resolve, ms));
