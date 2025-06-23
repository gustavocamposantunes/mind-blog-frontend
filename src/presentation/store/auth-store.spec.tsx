import { describe, it, expect, beforeEach } from "vitest";

import { useAuthStore } from "./auth-store";

const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
};

const mockAccount = {
  accessToken: "fake-token-123",
  user: mockUser,
};

describe("useAuthStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.getState().clearCurrentUser();
  });

  it("should set and get current user", () => {
    useAuthStore.getState().setCurrentUser(mockAccount);

    const state = useAuthStore.getState();

    expect(state.accessToken).toBe(mockAccount.accessToken);
    expect(state.user).toEqual(mockUser);
  });

  it("should clear current user", () => {
    const { setCurrentUser, clearCurrentUser, accessToken, user } = useAuthStore.getState();
    setCurrentUser(mockAccount);
    clearCurrentUser();

    expect(accessToken).toBe("");
    expect(user).toEqual({ id: 0, name: "", email: "" });
  });

  it("should hydrate state from local storage", () => {
    useAuthStore.getState().setCurrentUser(mockAccount);

    useAuthStore.getState().hydrate();

    const state = useAuthStore.getState();
    expect(state.accessToken).toBe(mockAccount.accessToken);
    expect(state.user).toEqual(mockUser);
  });

  it("should set isHydrated to true after hydration", () => {
    useAuthStore.getState().hydrate();

    const state = useAuthStore.getState();
    expect(state.isHydrated).toBe(true);
  });
});
