import { useQuery } from '@tanstack/react-query'

import type { GetProfileUseCase } from '@/domain/usecases'

export const useGetProfile = (getProfile: GetProfileUseCase, token: string) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      return await getProfile.getProfile(token)
    },
  })
}
