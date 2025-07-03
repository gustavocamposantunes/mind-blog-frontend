/* eslint-disable prettier/prettier */

import { New } from '../molecules'
import { Skeleton } from '../ui/skeleton'

type INews = {
  isLoading: boolean
} & React.ComponentProps<'section'>
export const News: React.FC<INews> = ({ className, isLoading }) =>
  isLoading ? (
    <Skeleton
      data-testid="skeleton-news"
      className={`p-4 bg-stone-950 rounded-sm ${className}`}
    />
  ) : (
    <section className={`p-4 bg-stone-950 rounded-sm ${className}`}>
      <h1 className="text-white! irish-grove-font">Notícias</h1>
        <New title='...' description='...' />
      </section>
    )
