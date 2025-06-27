import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { RegisterUserUseCase } from '@/domain/usecases/user/RegisterUser.usecase'

import { RemoteRegisterUser } from '@/data/usecases/user/RemoteRegisterUser'

export const makeRemoteRegisterUser = (): RegisterUserUseCase =>
  new RemoteRegisterUser(makeApiUrl('/user/register'), makeAxiosHttpClient())
