export type New = {
  title: string
  description: string
  url: string
}

export interface NewsModel {
  articles: Array<New>
}
