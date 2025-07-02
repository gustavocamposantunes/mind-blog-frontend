type Article = {
  title: string
  description: string
  url: string
}

export interface NewsModel {
  articles: Array<Article>
}
