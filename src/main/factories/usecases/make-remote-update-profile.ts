import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { UpdateProfileUseCase } from '@/domain/usecases/user/update-profile.usecase'

import { RemoteUpdateProfile } from '@/data/usecases/user/remote-update-profile'

export const makeRemoteUpdateProfile = (): UpdateProfileUseCase =>
  new RemoteUpdateProfile(makeApiUrl('/user/profile'), makeAxiosHttpClient())
