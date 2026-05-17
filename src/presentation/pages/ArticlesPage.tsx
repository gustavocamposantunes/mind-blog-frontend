import { useEffect, useRef } from 'react'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  ArticlesViewToggle,
  FavoriteButton,
  CustomSkeleton,
} from '../components/atoms'
import {
  ArticlesFilters,
  PublishedByInfo,
  Footer,
} from '../components/molecules'
import { ArticleListCard, CustomCard } from '../components/organism'
import { Button } from '../components/ui/button'
import { useResponsivePagination } from '../hooks'
import {
  useArticlesList,
  useArticlesFilters,
  useDeleteArticle,
  useFavouriteArticle,
} from '../hooks'
import { useAuthStore } from '../store'

import type {
  FavouriteArticleUseCase,
  ListArticlesUseCase,
} from '@/domain/usecases'
import type { DeleteArticleByIdUseCase } from '@/domain/usecases/article/delete-article-by-id.usecase'

import { CustomPagination } from '@/presentation/components/organism'
import { PageTemplate } from '@/presentation/components/templates'

type ArticlessPageProps = {
  listArticles: ListArticlesUseCase
  favouriteArticle: FavouriteArticleUseCase
  deleteArticle: DeleteArticleByIdUseCase
}

// Extracted categories - in a real app, this would come from an API
const ARTICLE_CATEGORIES = ['IA', 'DevOps', 'Desenvolvimento', 'Tecnologia']

export const ArticlesPage: React.FC<ArticlessPageProps> = ({
  listArticles,
  favouriteArticle,
  deleteArticle,
}) => {
  // ensure responsive pagination keeps URL params in sync
  useResponsivePagination()

  const navigate = useNavigate()
  const { user, accessToken } = useAuthStore()
  const {
    currentPage,
    currentLimit,
    currentTitle,
    currentCategory,
    currentView,
    updateFilters,
    resetFilters,
    pageParams,
  } = useArticlesFilters()

  const { data, isLoading, error, refetch } = useArticlesList(
    listArticles,
    pageParams,
  )
  const errorToastShown = useRef(false)

  useEffect(() => {
    if (error?.message === 'Erro interno do servidor' && !errorToastShown.current) {
      toast.error(error.message)
      errorToastShown.current = true
    }
  }, [error])

  const { favoriteById } = useFavouriteArticle(favouriteArticle, accessToken)

  const { deleteById } = useDeleteArticle(deleteArticle, accessToken, {
    onSuccess: () => {
      refetch()
    },
  })

  let paginationComponent
  if (!isLoading && data) {
    const isGridView = currentView === 'grid'
    paginationComponent = (
      <CustomPagination
        currentPage={currentPage}
        totalPages={data?.total / currentLimit}
        className={isGridView ? 'lg:col-span-2 xl:col-span-3 mt-4' : 'mt-4'}
        changePage={(page: number) => {
          updateFilters({ page })
        }}
      />
    )
  }

  const isLoggedIn = !!accessToken

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderArticleCard = (props: any) => {
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

    const footer = [
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
    ]

    const commonProps = {
      id: String(props.id),
      headerImageSrc: props.image,
      title: props.title,
      description: props.resume ?? props.content,
      category: props.category,
      onClick: () => {
        navigate(`/articles/${props.id}`)
      },
      footer,
    }

    if (currentView === 'list') {
      return <ArticleListCard key={props.id} {...commonProps} />
    }

    return (
      <CustomCard
        key={props.id}
        {...commonProps}
        imageClassName="min-h-[200px] lg:min-h-[250px] xl:min-h-[275px]"
      />
    )
  }

  const gridOrListClass =
    currentView === 'list'
      ? 'flex flex-col gap-4'
      : 'grid lg:grid-cols-2 xl:grid-cols-3 gap-4'

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageTemplate>
        <ArticlesFilters
          title={currentTitle}
          category={currentCategory}
          onTitleChange={(title) => {
            updateFilters({ title, page: 1 })
          }}
          onCategoryChange={(category) => {
            updateFilters({ category, page: 1 })
          }}
          onReset={resetFilters}
          categories={ARTICLE_CATEGORIES}
        />

        <div className="flex justify-end mb-4">
          <ArticlesViewToggle
            currentView={currentView}
            onViewChange={(view) => {
              updateFilters({ view, page: 1 })
            }}
          />
        </div>

        <section className={`${gridOrListClass} mb-16`}>
          {isLoading || error ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <CustomSkeleton key={`article-skeleton-${index}`} />
              ))}
            </>
          ) : (
            <>{data?.articles.map((props) => renderArticleCard(props))}</>
          )}
        </section>

        {paginationComponent}
      </PageTemplate>
      <Footer />
    </div>
  )
}
