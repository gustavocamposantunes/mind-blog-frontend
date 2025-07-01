import { makeApiUrl, makeAxiosHttpClient } from '../http'

import type { GetProfileUseCase } from '@/domain/usecases'

import { RemoteGetProfile } from '@/data/usecases/user/remote-get-profile'

export const makeRemoteGetProfile = (): GetProfileUseCase =>
  new RemoteGetProfile(makeApiUrl('/user/profile'), makeAxiosHttpClient())
