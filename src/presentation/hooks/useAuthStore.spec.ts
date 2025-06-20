import type { AuthenticateUserModel } from "@/domain/models";
import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";
import { useAuthStore } from "./useAuthStore";

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.getState().clearCurrentUser();
  });

  it("should set current user", () => {
    const account: AuthenticateUserModel = {
      accessToken: faker.string.uuid(),
      user: {
        id: faker.number.int({ min: 1 }),
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    };

    useAuthStore.getState().setCurrentUser(account);

    const currentUser = useAuthStore.getState().getCurrentUser();

    expect(currentUser.accessToken).toBe(account.accessToken);
    expect(currentUser.user.id).toBe(account.user.id);
    expect(currentUser.user.name).toBe(account.user.name);
    expect(currentUser.user.email).toBe(account.user.email);
  });
});