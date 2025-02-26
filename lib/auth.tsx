"use client"

import { create } from "zustand"

type AuthStore = {
  isLoggedIn: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  isLoggedIn: false,
  token: null,
  login: (token: string) => set({ isLoggedIn: true, token }),
  logout: () => set({ isLoggedIn: false, token: null }),
}))