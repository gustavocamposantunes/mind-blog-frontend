import type { HttpRemoteResponse } from "@/data/protocols";
import type { UserModel } from "@/domain/models";

export interface GetProfileUseCase {
  getProfile(token: string): Promise<HttpRemoteResponse<UserModel>>
}