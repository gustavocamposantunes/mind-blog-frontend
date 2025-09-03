import { PencilIcon, TrashIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { FavoriteButton } from '../components/atoms'
import { PublishedByInfo } from '../components/molecules'
import { CustomCard } from '../components/organism/CustomCard'
import { Button } from '../components/ui/button'
import {
  useArticlesList,
  useDeleteArticle,
  useFavouriteArticle,
  useResponsivePagination,
} from '../hooks'
import { useAuthStore } from '../store'

import type {
  FavouriteArticleUseCase,
  ListArticlesUseCase,
} from '@/domain/usecases'
import type { DeleteArticleByIdUseCase } from '@/domain/usecases/article/delete-article-by-id.usecase'

import { CustomPagination } from '@/presentation/components/organism'
import { ArticlesTemplate } from '@/presentation/components/templates'

type ArticlessPageProps = {
  listArticles: ListArticlesUseCase
  favouriteArticle: FavouriteArticleUseCase
  deleteArticle: DeleteArticleByIdUseCase
}

export const ArticlesPage: React.FC<ArticlessPageProps> = ({
  listArticles,
  favouriteArticle,
  deleteArticle,
}) => {
  const navigate = useNavigate()
  const { user, accessToken } = useAuthStore()
  const { currentPage, currentLimit, setSearchParams } =
    useResponsivePagination()

  const { data, isLoading, error } = useArticlesList(listArticles, {
    page: currentPage,
    limit: currentLimit,
  })

  const { favoriteById } = useFavouriteArticle(favouriteArticle, accessToken)

  const { deleteById } = useDeleteArticle(deleteArticle, accessToken)

  let paginationComponent
  if (!isLoading && data) {
    paginationComponent = (
      <CustomPagination
        currentPage={currentPage}
        totalPages={data?.total / currentLimit}
        className="lg:col-span-2 xl:col-span-3 mt-4"
        changePage={(page: number) => {
          setSearchParams({
            page: String(page),
            limit: String(currentLimit),
          })
        }}
      />
    )
  }

  const isLoggedIn = !!accessToken
  return (
    <ArticlesTemplate isLoading={isLoading} error={error}>
      {data?.articles.map(({ ...props }) => {
        const isCurrentUser = user.id === props.author.id
        let currentUserArticleAction
        if (isCurrentUser && isLoggedIn) {
          currentUserArticleAction = (
            <>
              <Link
                to={`/article/edit/${props.id}`}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <PencilIcon data-testid="pencil-icon" />
              </Link>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteById(props.id)
                }}
                className="bg-red-600!"
                data-testid="delete-btn"
              >
                <TrashIcon data-testid="delete-icon" />
              </Button>
            </>
          )
        }

        return (
          <CustomCard
            key={props.id}
            id={String(props.id)}
            headerImageSrc={props.image}
            title={props.title}
            description={props.content}
            onClick={() => {
              navigate(`/articles/${props.id}`)
            }}
            footer={[
              <PublishedByInfo
                avatar={props.author.avatar}
                author={props.author.firstName}
                publishedAt={props.publishedAt}
              />,
              <span className="flex gap-4">
                {currentUserArticleAction}
                <FavoriteButton
                  isFavorited={props.favourited}
                  isCurrentUserAndLoggedIn={!isCurrentUser && isLoggedIn}
                  favoriteById={favoriteById}
                />
              </span>,
            ]}
          />
        )
      })}
      {paginationComponent}
    </ArticlesTemplate>
  )
}
