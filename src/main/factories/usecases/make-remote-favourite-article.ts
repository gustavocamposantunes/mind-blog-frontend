import { RemoteFavouriteArticle } from "@/data/usecases";
import type { FavouriteArticleUseCase } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

export const makeRemoteFavouriteArticle = (): FavouriteArticleUseCase => new RemoteFavouriteArticle(makeApiUrl('/favourite'), makeAxiosHttpClient())