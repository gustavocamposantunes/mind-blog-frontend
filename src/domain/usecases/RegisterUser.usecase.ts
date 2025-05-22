import type { AuthenticateUserModel } from "../models";

export type RegisterUserParams = {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUserUseCase {
  register(registerUserParams: RegisterUserParams): Promise<{
    statusCode: number;
    data?: AuthenticateUserModel;
    error?: string;
  }>
}