import type { RegisterArticleParams, RegisterArticleUseCase } from "@/domain/usecases";
import { useMutation } from "@tanstack/react-query";

export const useRegisterArticle = (registerPost: RegisterArticleUseCase, token?: string) => {
  return useMutation({
    mutationFn: async (params: RegisterArticleParams) => {
      const result = await registerPost.register(params, token);

      return result.data;
    }
  });
}