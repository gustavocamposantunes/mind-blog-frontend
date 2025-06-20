import type { AuthenticateUserModel } from "@/domain/models";
import { beforeEach, describe, expect, it } from "vitest";
import { useAuthStore } from "./useAuthStore";
import { mockAuthenticateUserModel } from "@/domain/test";

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.getState().clearCurrentUser();
  });

  it("should set current user", () => {
    const account: AuthenticateUserModel = mockAuthenticateUserModel();

    useAuthStore.getState().setCurrentUser(account);

    const currentUser = useAuthStore.getState().getCurrentUser();

    expect(currentUser.accessToken).toBe(account.accessToken);
    expect(currentUser.user.id).toBe(account.user.id);
    expect(currentUser.user.name).toBe(account.user.name);
    expect(currentUser.user.email).toBe(account.user.email);
  });

  it("should get current user", () => {
    const account: AuthenticateUserModel = mockAuthenticateUserModel();

    useAuthStore.getState().setCurrentUser(account);

    const currentUser = useAuthStore.getState().getCurrentUser();

    expect(currentUser.accessToken).toBe(account.accessToken);
    expect(currentUser.user.id).toBe(account.user.id);
    expect(currentUser.user.name).toBe(account.user.name);
    expect(currentUser.user.email).toBe(account.user.email);
  });
});