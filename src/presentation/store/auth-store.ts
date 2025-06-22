import { create } from "zustand";

import type { AuthenticateUserModel } from "@/domain/models/AuthenticateUserModel";

import { LocalManageUserSession } from "@/data/usecases/LocalManageUserSession";

const manageUserSession = new LocalManageUserSession();

type AuthState = {
  accessToken: string;
  user: { id: number; name: string; email: string };
};

type AuthStore = AuthState & {
  setCurrentUser: (account: AuthenticateUserModel) => void;
  clearCurrentUser: () => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: "",
  user: { id: 0, name: "", email: "" },

  setCurrentUser: (account) => {
    manageUserSession.set(account);
    set({ accessToken: account.accessToken, user: account.user });
  },

  clearCurrentUser: () => {
    manageUserSession.clear();
    set({ accessToken: "", user: { id: 0, name: "", email: "" } });
  },

  hydrate: () => {
    const account = manageUserSession.get();
    if (account) {
      set({ accessToken: account.accessToken, user: account.user });
    }
  },
}));
