import type { ListArticlesUseCase } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

export const useArticlesList = (loadArticlesList: ListArticlesUseCase) => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      return await loadArticlesList.listAll()
    }
  })
}