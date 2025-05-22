import type { GetStorage, SetStorage } from "@/data/protocols/cache";
import type { AuthenticateUserModel } from "@/domain/models";

export class LocalStorageAdapter implements SetStorage, GetStorage<AuthenticateUserModel> {
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}