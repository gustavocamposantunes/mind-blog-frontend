import type { ManageUserSessionUseCase } from "@/domain/usecases/ManageUserSessionUseCase";
import type { AuthenticateUserModel } from "@/domain/models/AuthenticateUserModel";
import { currentUserStorage } from "@/infra/storage/LocalStorageCurrentUserAdapter";

export class LocalManageUserSession implements ManageUserSessionUseCase {
  set(account: AuthenticateUserModel): void {
    currentUserStorage.set(account);
  }

  get(): AuthenticateUserModel | null {
    return currentUserStorage.get();
  }

  clear(): void {
    currentUserStorage.clear();
  }
}
