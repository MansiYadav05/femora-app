import { api, ApiResponse, simulateDelay, USE_MOCK } from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "customer" | "admin";
}

export interface AuthResponseData {
  user: User;
  token: string;
}

const STORAGE_KEY_USER = "femora_user";
const STORAGE_KEY_TOKEN = "femora_auth_token";

export const authService = {
  async login(credentials: { email: string; password?: string }): Promise<ApiResponse<AuthResponseData>> {
    if (USE_MOCK) {
      await simulateDelay(400);
      const email = credentials.email.trim().toLowerCase();
      const isAdmin = email === "admin@femora.test";
      const user: User = {
        id: `usr-${Date.now()}`,
        name: isAdmin ? "Femora Administrator" : "Customer",
        email: credentials.email.trim(),
        phone: "",
        role: isAdmin ? "admin" : "customer",
      };
      const token = `mock-jwt-token-${isAdmin ? "admin" : "cust"}-${Date.now()}`;
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
      return {
        success: true,
        data: { user, token },
        message: "Signed in successfully",
      };
    }

    const res = await api.post<ApiResponse<AuthResponseData>>("/auth/login", credentials);
    if (res.data.success && res.data.data.token) {
      localStorage.setItem(STORAGE_KEY_TOKEN, res.data.data.token);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(res.data.data.user));
    }
    return res.data;
  },

  async register(payload: { name: string; email: string; phone: string; password?: string }): Promise<ApiResponse<AuthResponseData>> {
    if (USE_MOCK) {
      await simulateDelay(450);
      const user: User = {
        id: `usr-${Date.now()}`,
        name: payload.name.trim(),
        email: payload.email.trim(),
        phone: payload.phone.trim(),
        role: "customer",
      };
      const token = `mock-jwt-token-cust-${Date.now()}`;
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
      return {
        success: true,
        data: { user, token },
        message: "Account created successfully",
      };
    }

    const res = await api.post<ApiResponse<AuthResponseData>>("/auth/register", payload);
    if (res.data.success && res.data.data.token) {
      localStorage.setItem(STORAGE_KEY_TOKEN, res.data.data.token);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(res.data.data.user));
    }
    return res.data;
  },

  async getMe(): Promise<ApiResponse<User | null>> {
    if (USE_MOCK) {
      await simulateDelay(200);
      const raw = localStorage.getItem(STORAGE_KEY_USER);
      if (!raw) {
        return { success: true, data: null, message: "No active session" };
      }
      try {
        const user = JSON.parse(raw) as User;
        if (user.email?.toLowerCase() === "pooja.sharma@example.com" || user.id === "usr-pooja-1") {
          localStorage.removeItem(STORAGE_KEY_USER);
          localStorage.removeItem(STORAGE_KEY_TOKEN);
          return { success: true, data: null, message: "No active session" };
        }
        return { success: true, data: user, message: "User retrieved" };
      } catch {
        return { success: true, data: null };
      }
    }

    try {
      const res = await api.get<ApiResponse<User>>("/auth/me");
      return res.data;
    } catch {
      return { success: false, data: null, message: "Failed to authenticate" };
    }
  },

  async updateProfile(updates: Partial<User> & { password?: string }): Promise<ApiResponse<User>> {
    if (USE_MOCK) {
      await simulateDelay(350);
      const raw = localStorage.getItem(STORAGE_KEY_USER);
      const current = raw ? JSON.parse(raw) : { id: "", email: "", role: "customer" };
      const updated: User = {
        ...current,
        name: updates.name || current.name,
        phone: updates.phone || current.phone,
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      return { success: true, data: updated, message: "Profile updated successfully" };
    }

    const res = await api.put<ApiResponse<User>>("/auth/profile", updates);
    return res.data;
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  },
};
