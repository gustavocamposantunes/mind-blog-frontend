import { useMutation } from '@tanstack/react-query'

import type {
  UpdateProfileParams,
  UpdateProfileUseCase,
} from '@/domain/usecases/user/update-profile.usecase'

export const useUpdateProfile = (
  token: string,
  updateProfile: UpdateProfileUseCase,
) => {
  return useMutation({
    mutationFn: async (params: UpdateProfileParams) => {
      const result = await updateProfile.update(token, params)

      return result.data
    },
  })
}
