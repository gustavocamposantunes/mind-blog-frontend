import { useEffect, useRef } from 'react'
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
import { ArticleListCard } from '../components/organism'
import { Card } from '../components/ui/card'
import { useResponsivePagination } from '../hooks'
import {
  useArticlesList,
  useArticlesFilters,
  useFavouriteArticle,
} from '../hooks'
import { useAuthStore } from '../store'

import type {
  FavouriteArticleUseCase,
  ListArticlesUseCase,
} from '@/domain/usecases'

import { CustomPagination } from '@/presentation/components/organism'
import { PageTemplate } from '@/presentation/components/templates'

type ArticlessPageProps = {
  listArticles: ListArticlesUseCase
  favouriteArticle: FavouriteArticleUseCase
}

// Extracted categories - in a real app, this would come from an API
const ARTICLE_CATEGORIES = ['IA', 'DevOps', 'Desenvolvimento', 'Tecnologia']

type FeaturedArticleCardProps = {
  id: string
  title: string
  category?: string
  image?: string
  excerpt: string
  onClick(): void
  footer: React.ReactNode
}

const FeaturedArticleCard: React.FC<FeaturedArticleCardProps> = ({
  id,
  title,
  category,
  image,
  excerpt,
  onClick,
  footer,
}) => {
  return (
    <Card
      onClick={onClick}
      data-testid={`custom-card-${id}`}
      className="group h-full cursor-pointer overflow-hidden rounded-3xl border-border bg-card/70 shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div className="h-48 w-full overflow-hidden bg-muted">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          {category ? (
            <span className="text-xs font-semibold uppercase tracking-wide text-primary/80">
              {category}
            </span>
          ) : null}

          <h3 className="line-clamp-2 text-xl font-semibold leading-tight text-foreground">
            {title}
          </h3>

          <p className="line-clamp-3 text-sm leading-6 text-foreground/70">
            {excerpt}
          </p>

          <div className="mt-auto text-xs text-foreground/70">{footer}</div>
        </div>
      </div>
    </Card>
  )
}

export const ArticlesPage: React.FC<ArticlessPageProps> = ({
  listArticles,
  favouriteArticle,
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

  const { data, isLoading, error } = useArticlesList(listArticles, pageParams)
  const errorToastShown = useRef(false)

  useEffect(() => {
    if (
      error?.message === 'Erro interno do servidor' &&
      !errorToastShown.current
    ) {
      toast.error(error.message)
      errorToastShown.current = true
    }
  }, [error])

  const { favoriteById } = useFavouriteArticle(favouriteArticle, accessToken)

  let paginationComponent
  if (!isLoading && data) {
    const isGridView = currentView === 'grid'
    paginationComponent = (
      <CustomPagination
        currentPage={currentPage}
        totalPages={Math.ceil((data?.total ?? 0) / currentLimit)}
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
    const description = props.resume ?? props.content

    const footer = [
      <PublishedByInfo
        avatar={props.author.avatar}
        author={props.author.firstName}
        publishedAt={props.publishedAt}
        key={props.id + props.author.firstName}
      />,
      <span className="flex gap-2" key={props.id + 'actions'}>
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
      description,
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
      <FeaturedArticleCard
        key={props.id}
        id={commonProps.id}
        title={commonProps.title}
        image={props.image}
        excerpt={description}
        category={commonProps.category}
        onClick={commonProps.onClick}
        footer={commonProps.footer}
      />
    )
  }

  const gridOrListClass =
    currentView === 'list'
      ? 'flex flex-col gap-4'
      : 'grid gap-6 md:grid-cols-2 xl:grid-cols-3'

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
