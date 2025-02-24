"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";

interface AuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  checkAuth: () => void;
}

// ✅ Safe Zustand Store with localStorage access only on the client
export const useAuth = create<AuthStore>((set) => ({
  isLoggedIn: false,
  login: () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("authToken", `admin-token-${Date.now()}`);
        set({ isLoggedIn: true });
      } catch (error) {
        console.error("Failed to set localStorage:", error);
      }
    }
  },
  logout: () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("authToken");
        set({ isLoggedIn: false });
      } catch (error) {
        console.error("Failed to remove item from localStorage:", error);
      }
    }
  },
  checkAuth: () => {
    if (typeof window !== "undefined") {
      try {
        const token = localStorage.getItem("authToken");
        set({ isLoggedIn: token !== null });
      } catch (error) {
        console.error("Failed to read localStorage:", error);
        set({ isLoggedIn: false });
      }
    }
  },
}));

// ✅ Safe Hook: Prevents `localStorage` errors in Next.js SSR
export function useAuthCheck() {
  const { checkAuth } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      try {
        checkAuth(); // Only call `checkAuth()` when on the client
      } catch (error) {
        console.error("Failed to access localStorage:", error);
      }
    }
  }, [checkAuth]);

  return isClient; // Returns true only after hydration
}