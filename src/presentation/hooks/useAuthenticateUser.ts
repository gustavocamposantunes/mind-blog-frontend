import { useMutation } from '@tanstack/react-query'

import type {
  AuthenticateUserUseCase,
  AuthParams,
} from '@/domain/usecases/auth/AuthenticateUser.usecase'

export const useAuthenticateUser = (
  authenticateUser: AuthenticateUserUseCase,
) => {
  return useMutation({
    mutationFn: async (params: AuthParams) => {
      const result = await authenticateUser.auth(params)

      return result.data
    },
  })
}
