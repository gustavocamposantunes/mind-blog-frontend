export type ArticleModel = {
  id: number;
  title: string;
  content: string;
  author_id: number;
  publishedAt: string;
  updatedAt: string;
};

export type ArticleListModel = {
  posts: ArticleModel[];
  total: number;
  limit: number;
  page: number;
};