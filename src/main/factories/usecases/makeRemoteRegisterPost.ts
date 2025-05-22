import { RemoteRegisterPost } from "@/data/usecases/RemoteRegisterPost";
import { makeApiUrl, makeAxiosHttpClient } from "../http";
import type { RegisterPostUseCase } from "@/domain/usecases";

export const makeRemoteRegisterPost = (): RegisterPostUseCase => new RemoteRegisterPost(makeApiUrl("/posts"), makeAxiosHttpClient());