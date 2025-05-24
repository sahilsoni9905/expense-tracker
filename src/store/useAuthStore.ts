import { create } from "zustand";
import { matchPassword } from "../api";

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      if (email !== "prakashowner@gmail.com") {
        return false;
      }
      const response = await matchPassword(password);
      const isValid = response.data?.isMatch === true;
      set({ isAuthenticated: isValid });
      return isValid;
    } catch (error: any) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      return false;
    }
  },
  logout: () => set({ isAuthenticated: false }),
}));

export default useAuthStore