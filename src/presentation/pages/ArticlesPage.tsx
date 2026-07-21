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
import { useResponsivePagination } from '../hooks'
import {
  useArticlesList,
  useArticlesFilters,
  useFavouriteArticle,
} from '../hooks'
import { useAuthStore } from '../store'

import type { ArticleModel } from '@/domain/models'
import type {
  FavouriteArticleUseCase,
  ListArticlesUseCase,
} from '@/domain/usecases'

import { CustomPagination } from '@/presentation/components/organism'
import { PageTemplate } from '@/presentation/components/templates'
import { ResponsiveArticleCard } from '@/presentation/pages/components'

type ArticlessPageProps = {
  listArticles: ListArticlesUseCase
  favouriteArticle: FavouriteArticleUseCase
}

const ARTICLE_CATEGORIES = ['IA', 'DevOps', 'Desenvolvimento', 'Tecnologia']

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

  const renderArticleCard = (article: ArticleModel) => {
    const isCurrentUser = user.id === article.author.id
    const description = article.resume ?? article.content

    const footer = [
      <PublishedByInfo
        avatar={article.author.image}
        author={article.author.fullName}
        publishedAt={article.publishedAt}
        key={article.id + article.author.fullName + 'info'}
      />,
      <span className="flex gap-2" key={article.id + 'actions'}>
        <FavoriteButton
          articleId={article.id}
          isFavorited={article.favourited}
          isCurrentUserAndLoggedIn={!isCurrentUser && isLoggedIn}
          favoriteById={favoriteById}
        />
      </span>,
    ]

    const commonProps = {
      id: String(article.id),
      headerImageSrc: article.image,
      title: article.title,
      description,
      category: article.category,
      onClick: () => {
        navigate(`/articles/${article.id}`)
      },
      footer,
    }

    return (
      <ResponsiveArticleCard
        key={article.id}
        {...commonProps}
        view={currentView}
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
