import type { AuthenticateUserModel } from '../models/AuthenticateUserModel'

export interface ManageUserSessionUseCase {
  set(account: AuthenticateUserModel): void
  get(): AuthenticateUserModel | null
  clear(): void
}
