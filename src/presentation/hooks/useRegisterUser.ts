import type { RegisterUserParams, RegisterUserUseCase } from "@/domain/usecases";
import { useMutation } from "@tanstack/react-query";

export const useRegisterUser = (registerUser: RegisterUserUseCase) => {
  return useMutation({
    mutationFn: async (params: RegisterUserParams) => {
      const result = await registerUser.register(params);

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    }
  });
}