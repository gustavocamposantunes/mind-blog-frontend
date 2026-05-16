import { PencilIcon, TrashIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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

  const { data, isLoading, error, refetch } = useArticlesList(listArticles, {
    page: currentPage,
    limit: currentLimit,
  })

  const { favoriteById } = useFavouriteArticle(favouriteArticle, accessToken)

  const { deleteById } = useDeleteArticle(deleteArticle, accessToken, {
    onSuccess: () => {
      refetch()
    },
  })

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
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/article/edit/${props.id}`)
                }}
                className="bg-blue-600!"
                data-testid="edit-btn"
              >
                <PencilIcon data-testid="pencil-icon" />
              </Button>
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
            imageClassName="min-h-[200px] lg:min-h-[250px] xl:min-h-[275px]"
            title={props.title}
            description={props.content}
            category={props.category}
            onClick={() => {
              navigate(`/articles/${props.id}`)
            }}
            footer={[
              <PublishedByInfo
                avatar={props.author.avatar}
                author={props.author.firstName}
                publishedAt={props.publishedAt}
                key={props.id + props.author.firstName}
              />,
              <span className="flex gap-2" key={props.id + 'actions'}>
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
