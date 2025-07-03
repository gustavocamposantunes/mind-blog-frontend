import { NewArticle } from '../molecules'

import type { New } from '@/domain/models'

type INews = {
  news?: Array<New>
} & React.ComponentProps<'section'>
export const News: React.FC<INews> = ({ className, news }) => (
  <section
    data-testid="list-news"
    className={`p-4 bg-stone-950 rounded-sm ${className}`}
  >
    <h1 className="text-white! irish-grove-font">Notícias</h1>
    {news?.map(({ title, description }) => (
      <NewArticle key={title} title={title} description={description} />
    ))}
  </section>
)
