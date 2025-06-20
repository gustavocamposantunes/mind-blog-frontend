import { RemoteRegisterPost } from "@/data/usecases/RemoteRegisterArticle";
import { makeApiUrl, makeAxiosHttpClient } from "../http";
import type { RegisterArticleUseCase } from "@/domain/usecases";

export const makeRemoteRegisterArticle = (): RegisterArticleUseCase => new RemoteRegisterPost(makeApiUrl("/articles"), makeAxiosHttpClient());