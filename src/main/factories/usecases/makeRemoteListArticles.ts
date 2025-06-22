import { makeApiUrl, makeAxiosHttpClient } from "../http";

import type { ListArticlesUseCase } from "@/domain/usecases";

import { RemoteListArticles } from "@/data/usecases";

export const makeRemoteListArticles = (): ListArticlesUseCase => new RemoteListArticles(makeApiUrl("/articles"), makeAxiosHttpClient());