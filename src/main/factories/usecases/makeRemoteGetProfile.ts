import { makeApiUrl, makeAxiosHttpClient } from "../http";

import type { GetProfileUseCase } from "@/domain/usecases";

import { RemoteGetProfile } from "@/data/usecases/RemoteGetProfile";

export const makeRemoteGetProfile = (): GetProfileUseCase => new RemoteGetProfile(makeApiUrl("/user/profile"), makeAxiosHttpClient());