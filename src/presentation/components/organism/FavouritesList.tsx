import { useNavigate } from 'react-router-dom'

import { ErrorMessage, FavouriteSkeleton } from '../atoms'
import { PublishedByInfo } from '../molecules'

import { CustomCard } from './CustomCard'

import type { ArticleModel } from '@/domain/models'

type FavouritesListProps = {
  error: Error | null
  isLoading: boolean
  articles?: ArticleModel[]
}

export function FavouritesList({
  error,
  isLoading,
  articles,
}: FavouritesListProps) {
  const navigate = useNavigate()
  if (error) return <ErrorMessage error={error} />

  if (isLoading) return <FavouriteSkeleton />

  return (
    <>
      {articles?.map(({ ...props }, index) => (
        <CustomCard
          key={props.id}
          id={String(props.id)}
          headerImageSrc={props.image}
          imageClassName="max-w-[50%]"
          ranking={`0${index + 1}`}
          title={props.title}
          description={props.content}
          onClick={() => {
            navigate(`/articles/${props.id}`)
          }}
          footer={
            <PublishedByInfo
              avatar={props.author.avatar}
              author={props.author.firstName}
              publishedAt={props.publishedAt}
            />
          }
        />
      ))}
    </>
  )
}
