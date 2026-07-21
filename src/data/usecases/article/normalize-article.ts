import type {
  ArticleListModel,
  ArticleModel,
  FavouriteModel,
} from '@/domain/models'

type ArticleApiModel = ArticleModel & {
  favoritesCount?: number
}

type FavouriteApiModel = FavouriteModel & {
  favoritesCount?: number
}

export const normalizeArticle = (article: ArticleApiModel): ArticleModel => {
  const { favoritesCount, ...rest } = article

  if (article.favouriteCount === undefined && favoritesCount === undefined) {
    return rest as ArticleModel
  }

  return {
    ...rest,
    favouriteCount: article.favouriteCount ?? favoritesCount ?? 0,
  }
}

export const normalizeArticleList = (
  articleList: ArticleListModel,
): ArticleListModel => ({
  ...articleList,
  articles: (articleList.articles ?? []).map((article) =>
    normalizeArticle(article as ArticleApiModel),
  ),
})

export const normalizeFavourite = (
  favourite?: FavouriteApiModel,
): FavouriteModel => {
  if (!favourite) {
    return {
      favouriteCount: 0,
      favourited: false,
    }
  }

  const { favoritesCount, ...rest } = favourite

  return {
    ...rest,
    favouriteCount: favourite.favouriteCount ?? favoritesCount ?? 0,
  }
}
