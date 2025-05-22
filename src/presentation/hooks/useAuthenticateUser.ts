import type { AuthenticateUserUseCase, AuthParams } from "@/domain/usecases/AuthenticateUserUseCase"
import { useMutation } from "@tanstack/react-query"

export const useAuthenticateUser = (authenticateUser: AuthenticateUserUseCase) => {
  return useMutation({
    mutationFn: async (params: AuthParams) => {
      const result = await authenticateUser.auth(params);

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    }
  });
}