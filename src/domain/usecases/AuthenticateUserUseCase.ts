import type { AuthenticateUserModel } from "../models"

export type AuthParams ={ email: string, password: string }

export interface AuthenticateUserUseCase {
  auth(authenticationParams: AuthParams): Promise<{
    statusCode: number;
    data?: AuthenticateUserModel;
    error?: string;
  }>
}