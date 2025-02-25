"use client"

import { create } from "zustand"

type AuthStore = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}))