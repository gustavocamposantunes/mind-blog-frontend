import type { RegisterPostParams, RegisterPostUseCase } from "@/domain/usecases";
import { useMutation } from "@tanstack/react-query";

export const useRegisterPost = (registerPost: RegisterPostUseCase, token?: string) => {
  return useMutation({
    mutationFn: async (params: RegisterPostParams) => {
      const result = await registerPost.register(params, token);

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    }
  });
}