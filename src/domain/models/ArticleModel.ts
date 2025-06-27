export type ArticleModel = {
  id: number
  title: string
  content: string
  image?: string
  author_id: number
  publishedAt: string
  updatedAt: string
}

export type ArticleListModel = {
  articles: ArticleModel[]
  total: number
  limit: number
  page: number
}
