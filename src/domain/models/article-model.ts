export type AuthorModel = {
  id: number
  firstName: string
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

export type ArticleListModel = {
  articles: ArticleModel[]
  total: number
  limit: number
  page: number
}
