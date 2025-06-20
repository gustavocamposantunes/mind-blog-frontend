import type { GetPostByIdUseCase } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";
import { RemoteGetPost } from "@/data/usecases/RemoteGetPost";

export const makeRemoteGetPostById = (): GetPostByIdUseCase => new RemoteGetPost(makeApiUrl("/posts"), makeAxiosHttpClient());