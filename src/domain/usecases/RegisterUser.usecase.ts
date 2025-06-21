import type { HttpRemoteResponse } from "@/data/protocols";
import type { AuthenticateUserModel } from "../models";

export type RegisterUserParams = {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUserUseCase {
  register(registerUserParams: RegisterUserParams): Promise<HttpRemoteResponse<AuthenticateUserModel>>
}