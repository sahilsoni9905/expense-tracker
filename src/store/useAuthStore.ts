import { create } from "zustand";

interface AuthState {
  email: string;
  password: string;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  email: "prakashowner@gmail.com",
  password: "owner000",
  isAuthenticated: false,
  login: (inputEmail, inputPassword) => {
    const match =
      inputEmail === "prakashowner@gmail.com" && inputPassword === "owner000";
    set({ isAuthenticated: match });
    return match;
  },
  logout: () => set({ isAuthenticated: false }),
}));

export default useAuthStore;
