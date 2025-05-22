import type { GetPostUseCase } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

export const usePostFetch = (fetchPost: GetPostUseCase, id: string) => {
  return useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      return await fetchPost.fetch(id)
    }
  })
}