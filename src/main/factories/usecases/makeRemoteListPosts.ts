import { RemoteListPosts } from "@/data/usecases/RemoteListPosts";
import type { ListPostsUseCase } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

export const makeRemoteListPosts = (): ListPostsUseCase => new RemoteListPosts(makeApiUrl("/posts"), makeAxiosHttpClient());