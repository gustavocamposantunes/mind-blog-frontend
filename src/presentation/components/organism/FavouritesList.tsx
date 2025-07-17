import { ErrorMessage, FavouriteSkeleton } from '../atoms'

import { ArticleCard } from './ArticleCard'

type FavouritesListProps = {
  error: Error | null
  isLoading: boolean
  articles?: {
    id: number
    title: string
    content: string
    image?: string
  }[]
}

export function FavouritesList({
  error,
  isLoading,
  articles,
}: FavouritesListProps) {
  if (error) return <ErrorMessage error={error} />

  if (isLoading) return <FavouriteSkeleton />

  return (
    <>
      {articles?.map(({ id, title, content, image }, index) => (
        <ArticleCard
          key={id}
          id={id}
          title={title}
          content={content}
          image={image}
          favourite={`0${index + 1}`}
        />
      ))}
    </>
  )
}
