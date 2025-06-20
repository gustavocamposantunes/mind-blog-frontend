import type { GetPostByIdUseCase } from "@/domain/usecases";
import { useQuery } from "@tanstack/react-query";

export const useGetPostById = (fetchPost: GetPostByIdUseCase, id: string) => {
  return useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      return await fetchPost.getById(id)
    }
  })
}