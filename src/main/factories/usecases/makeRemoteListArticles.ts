import { RemoteListArticles } from "@/data/usecases";
import type { ListArticlesUseCase } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

export const makeRemoteListArticles = (): ListArticlesUseCase => new RemoteListArticles(makeApiUrl("/articles"), makeAxiosHttpClient());