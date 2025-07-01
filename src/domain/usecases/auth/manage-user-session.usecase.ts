import type { AuthenticateUserModel } from '../../models/authenticate-user-model'

export interface ManageUserSessionUseCase {
  set(account: AuthenticateUserModel): void
  get(): AuthenticateUserModel | null
  clear(): void
}
