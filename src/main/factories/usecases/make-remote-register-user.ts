import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { RegisterUserUseCase } from '@/domain/usecases/user/register-user.usecase'

import { RemoteRegisterUser } from '@/data/usecases/user/remote-register-user'

export const makeRemoteRegisterUser = (): RegisterUserUseCase =>
  new RemoteRegisterUser(makeApiUrl('/user/register'), makeAxiosHttpClient())
