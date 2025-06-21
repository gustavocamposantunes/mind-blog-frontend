import type { GetArticleByIdUseCase } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

export const useGetArticleById = (getArticle: GetArticleByIdUseCase, id: string) => {
  return useQuery({
    queryKey: ['article'],
    queryFn: async () => {
      return await getArticle.getById(id)
    }
  })
}