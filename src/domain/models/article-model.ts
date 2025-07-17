export type AuthorModel = {
  id: number
  name: string
  avatar?: string
}

export type ArticleModel = {
  id: number
  title: string
  content: string
  image?: string
  author: AuthorModel
  favouriteCount: number
  favourited: boolean
  publishedAt: string
  updatedAt: string
}

export type Filters = 'mostFavouriteds'

export type ArticleListModel = {
  articles: ArticleModel[]
  filters?: Array<Filters>
  total: number
  limit: number
  page: number
}
