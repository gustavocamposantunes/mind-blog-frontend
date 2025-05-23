
import { UnexpectedError } from "@/domain/errors";
import type { AuthenticateUserModel } from "@/domain/models";
import { makeLocalStorageAdapter } from "../factories/cache";

export const setCurrentUserAdapter = (account: AuthenticateUserModel | null): void => {
  if (!account?.accessToken) throw new UnexpectedError();
  makeLocalStorageAdapter().set('account', account);
};

export const getCurrentUserAdapter = (): AuthenticateUserModel => {
  return makeLocalStorageAdapter().get('account');
};

export const clearCurrentUserAdapter = (): void => {
  makeLocalStorageAdapter().clear('account')
}
