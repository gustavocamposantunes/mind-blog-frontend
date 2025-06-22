import { makeApiUrl, makeAxiosHttpClient } from "../http";

import type { GetArticleByIdUseCase } from "@/domain/usecases";

import { RemoteGetArticleById } from "@/data/usecases";

export const makeRemoteGetArticleById = (): GetArticleByIdUseCase => new RemoteGetArticleById(makeApiUrl("/articles"), makeAxiosHttpClient());