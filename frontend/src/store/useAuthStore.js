import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import { Toast } from "./useToastStore";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoggingIn: false,
  isCheckingAuth: false,
  isSigningUp: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/me");
      console.log("Auth check response:", response.data);

      set({ authUser: response.data.user });
    } catch (error) {
      console.error("Error checking authentication:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/register", data);
      console.log("Sign up response:", response.data);
      set({ authUser: response.data.user });
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      console.log("Login response:", response.data);
      Toast.success("Login successful", "Welcome back!", 3000);
      set({ authUser: response.data.user });
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      Toast.success("Logout successful", "Goodbye!", 3000);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },
}));
