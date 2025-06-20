import type { AuthenticateUserModel } from "@/domain/models";
import { clearCurrentUserAdapter, getCurrentUserAdapter, setCurrentUserAdapter } from "@/main/adapters/CurrentAccountAdapter";
import { create } from "zustand";

const initialUser = getCurrentUserAdapter();

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
  accessToken: initialUser?.accessToken || "",
  user: initialUser?.user || { id: 0, name: "", email: "" },

  setCurrentUser: (account) => {
    set(() => ({
      accessToken: account.accessToken,
      user: {
        id: account.user.id,
        name: account.user.name,
        email: account.user.email,
      },
    }));
    setCurrentUserAdapter(account)
  },

  getCurrentUser: () => ({
    accessToken: get().accessToken,
    user: { ...get().user },
  }),

  clearCurrentUser: () => {
    set(() => ({
      accessToken: "",
      user: { id: 0, name: "", email: "" },
    }));
    clearCurrentUserAdapter();
  },
}));