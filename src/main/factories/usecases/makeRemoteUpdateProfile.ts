import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { UpdateProfileUseCase } from '@/domain/usecases/user/UpdateProfile.usecase'

import { RemoteUpdateProfile } from '@/data/usecases/user/RemoteUpdateProfile'

export const makeRemoteUpdateProfile = (): UpdateProfileUseCase =>
  new RemoteUpdateProfile(makeApiUrl('/user/profile'), makeAxiosHttpClient())
