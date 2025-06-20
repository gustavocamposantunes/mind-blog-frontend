import type { GetArticleByIdUseCase } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";
import { RemoteGetArticleById } from "@/data/usecases";

export const makeRemoteGetArticleById = (): GetArticleByIdUseCase => new RemoteGetArticleById(makeApiUrl("/article"), makeAxiosHttpClient());