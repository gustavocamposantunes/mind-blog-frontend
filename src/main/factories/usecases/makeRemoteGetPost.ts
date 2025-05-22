import type { GetPostUseCase } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";
import { RemoteGetPost } from "@/data/usecases/RemoteGetPost";

export const makeRemoteGetPost = (): GetPostUseCase => new RemoteGetPost(makeApiUrl("/posts"), makeAxiosHttpClient());