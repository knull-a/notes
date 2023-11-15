import { Rest, useRest } from "@/services";
import { User, AuthRequest } from "@/services/auth/types";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";

type AuthStore = {
  user: User;
  isAuth: boolean;
  api: Rest;
  login(data: AuthRequest): Promise<void>;
  registration(data: AuthRequest): Promise<void>;
  logout(): Promise<void>;
  setUser: (user: User) => void;
  setAuth: (user: boolean) => void;
  checkAuth(): Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: {} as User,
  isAuth: false,
  api: useRest(),

  setUser: (newUser: User) => set(() => ({ user: newUser })),
  setAuth: (newAuth: boolean) => set(() => ({ isAuth: newAuth })),

  async login(data: AuthRequest) {
    try {
      const response = await useRest().auth.login(data);
      localStorage.setItem("token", response.accessToken);

      set(() => ({ isAuth: true }));
      set(() => ({ user: response.user }));

      const navigate = useNavigate();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  },

  async registration(data: AuthRequest) {
    try {
      const response = await useRest().auth.registration(data);
      localStorage.setItem("token", response.accessToken);

      set(() => ({ isAuth: true }));
      set(() => ({ user: response.user }));

      const navigate = useNavigate();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  },

  async logout() {
    try {
      await useRest().auth.logout();
      localStorage.removeItem("token");

      set(() => ({ isAuth: false }));
      set(() => ({ user: {} as User }));
    } catch (error) {
      console.error(error);
    }
  },

  async checkAuth() {
    try {
      const response = await useRest().auth.refresh();
      localStorage.setItem("token", response.accessToken);

      set(() => ({ isAuth: true }));
      set(() => ({ user: response.user }));
    } catch (error) {
      console.error(error);
    }
  },
}));
