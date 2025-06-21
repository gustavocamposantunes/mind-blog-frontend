import type { AuthenticateUserUseCase, AuthParams } from "@/domain/usecases/AuthenticateUserUseCase"
import { useMutation } from "@tanstack/react-query"

export const useAuthenticateUser = (authenticateUser: AuthenticateUserUseCase) => {
  return useMutation({
    mutationFn: async (params: AuthParams) => {
      const result = await authenticateUser.auth(params);

      return result.data;
    }
  });
}