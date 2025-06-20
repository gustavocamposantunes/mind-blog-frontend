import type { AuthenticateUserModel } from "@/domain/models";
import { create } from "zustand";

type AuthStore = {
  accessToken: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  setCurrentUser: (account: AuthenticateUserModel) => void;
  getCurrentUser: () => AuthenticateUserModel;
  clearCurrentUser: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  accessToken: "",
  user: { id: 0, name: "", email: "" },

  setCurrentUser: (account) =>
    set(() => ({
      accessToken: account.accessToken,
      user: {
        id: account.user.id,
        name: account.user.name,
        email: account.user.email,
      },
    })),

  getCurrentUser: () => ({
    accessToken: get().accessToken,
    user: { ...get().user },
  }),

  clearCurrentUser: () =>
    set(() => ({
      accessToken: "",
      user: { id: 0, name: "", email: "" },
  })),
}));