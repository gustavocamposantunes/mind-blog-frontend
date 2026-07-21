import { type ReactNode } from 'react'

import { CustomAvatar } from '../molecules/CustomAvatar'

import { MarkdownRenderer } from './MarkdownRenderer'

import { formatDateToShortMonth } from '@/presentation/utils/dateFormatter'

interface IArticle {
  title: string
  publishedAt: string
  image?: string
  content: string
  author?: {
    id: number
    firstName: string
    avatar?: string
  }
  toogleFavouriteSlot?: ReactNode
  toogleEditSlot?: ReactNode
}

export const Article: React.FC<IArticle> = ({
  title,
  publishedAt,
  image,
  content,
  author,
  toogleFavouriteSlot,
  toogleEditSlot,
}) => {
  const formatterdDate = formatDateToShortMonth(
    publishedAt || new Date().toISOString(),
  )

  const getInitials = (name?: string) =>
    (name || '')
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()

  return (
    <article>
      <div className="flex flex-col gap-4 pb-6 border-b border-[#cecece]">
        <h1 className="text-2xl lg:text-4xl">{title}</h1>
        <span className="flex justify-between items-center">
          <span className="flex gap-2 items-center">
            {author ? (
              <>
                <CustomAvatar
                  src={author.avatar}
                  fallbackText={getInitials(author.firstName)}
                />
                <p data-testid="published-at">
                  Por <b>{author.firstName}</b> - {formatterdDate}
                </p>
                {toogleFavouriteSlot}
              </>
            ) : (
              <p data-testid="published-at">
                Por <b>Desconhecido</b> - {formatterdDate}
              </p>
            )}
          </span>
          {toogleEditSlot}
        </span>
      </div>
      <img className="mt-5 w-full" src={image} alt={title} />
      <div data-testid="article-content" className="p-4 text-lg">
        <MarkdownRenderer content={content} />
      </div>
    </article>
  )
}
