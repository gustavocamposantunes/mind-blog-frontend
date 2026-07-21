export type CommentAuthorModel = {
  id: number
  fullName: string
  image?: string
}

export type CommentModel = {
  id: number
  article_id: number
  user_id: number
  content: string
  createdAt: string
  updatedAt: string
  user: CommentAuthorModel
}
