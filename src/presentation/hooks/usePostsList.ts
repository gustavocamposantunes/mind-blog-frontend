import type { ListPostsUseCase } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

export const usePostsList = (loadPostsList: ListPostsUseCase) => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      return await loadPostsList.listAll()
    }
  })
}