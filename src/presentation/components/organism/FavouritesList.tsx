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
      {articles?.map(({ ...props }, index) => (
        <ArticleCard key={props.id} {...props} favourite={`0${index + 1}`} />
      ))}
    </>
  )
}
