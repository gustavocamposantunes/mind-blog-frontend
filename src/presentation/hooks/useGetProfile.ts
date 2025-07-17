import { useQuery } from '@tanstack/react-query'

import type { GetProfileUseCase } from '@/domain/usecases'

export const useGetProfile = (getProfile: GetProfileUseCase, token: string) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await getProfile.getProfile(token)
      return data
    },
  })
}
