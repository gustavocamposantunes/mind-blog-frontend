import type { UserModel } from "@/domain/models";

export interface GetProfileUseCase {
  getProfile(token: string): Promise<UserModel>
}