import type { AuthenticateUserModel } from '@/domain/models/authenticate-user-model'
import type { ManageUserSessionUseCase } from '@/domain/usecases/auth/manage-user-session.usecase'

import { currentUserStorage } from '@/infra/storage/local-storage-current-user-adapter'

export class LocalManageUserSession implements ManageUserSessionUseCase {
  set(account: AuthenticateUserModel): void {
    currentUserStorage.set(account)
  }

  get(): AuthenticateUserModel | null {
    return currentUserStorage.get()
  }

  clear(): void {
    currentUserStorage.clear()
  }
}
