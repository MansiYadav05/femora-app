import React, { createContext, useContext, useEffect, useState } from "react";
import { authService, User } from "../services/authService";

interface AuthContextType {
  user: User | null;
  role: "customer" | "admin" | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password?: string }) => Promise<{ success: boolean; message?: string }>;
  register: (payload: { name: string; email: string; phone: string; password?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User> & { password?: string }) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check existing stored session
    authService.getMe().then((res) => {
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  const login = async (credentials: { email: string; password?: string }) => {
    setIsLoading(true);
    try {
      const res = await authService.login(credentials);
      if (res.success && res.data.user) {
        setUser(res.data.user);
        setIsLoading(false);
        return { success: true, message: res.message };
      }
      setIsLoading(false);
      return { success: false, message: res.message || "Login failed" };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, message: err.message || "An error occurred during login" };
    }
  };

  const register = async (payload: { name: string; email: string; phone: string; password?: string }) => {
    setIsLoading(true);
    try {
      const res = await authService.register(payload);
      if (res.success && res.data.user) {
        setUser(res.data.user);
        setIsLoading(false);
        return { success: true, message: res.message };
      }
      setIsLoading(false);
      return { success: false, message: res.message || "Registration failed" };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, message: err.message || "An error occurred during registration" };
    }
  };

  const updateProfile = async (updates: Partial<User> & { password?: string }) => {
    const res = await authService.updateProfile(updates);
    if (res.success && res.data) {
      setUser(res.data);
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message || "Update failed" };
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
