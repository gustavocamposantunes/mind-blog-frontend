import { PencilIcon, TrashIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ArticlesViewToggle, CustomSkeleton } from '../../components/atoms'
import { PublishedByInfo } from '../../components/molecules'
import { ArticleListCard, CustomCard } from '../../components/organism'
import { Button } from '../../components/ui/button'

import type { ArticleModel } from '@/domain/models'

import { CustomPagination } from '@/presentation/components/organism'

type ViewMode = 'grid' | 'list'

type DashboardMetric = {
  label: string
  value: string
}

type DashboardHeroSectionProps = {
  userFullName: string
  metrics: DashboardMetric[]
}

type DashboardArticlesSectionProps = {
  articles: ArticleModel[]
  currentPage: number
  currentView: ViewMode
  hasError: boolean
  isLoading: boolean
  totalPages: number
  onDeleteArticle(article: Pick<ArticleModel, 'id' | 'title'>): void
  onEditArticle(articleId: number): void
  onOpenArticle(articleId: number): void
  onPageChange(page: number): void
  onViewChange(view: ViewMode): void
}

type DashboardRecentActivityProps = {
  articles: ArticleModel[]
  isLoading: boolean
}

export const DashboardHeroSection: React.FC<DashboardHeroSectionProps> = ({
  userFullName,
  metrics,
}) => {
  return (
    <section className="mb-10 flex flex-col gap-6 rounded-3xl border border-border bg-linear-to-br from-background via-background to-card/40 px-6 py-8 shadow-xl shadow-black/10 md:px-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Bem-vindo de volta, {userFullName}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/70 md:text-base">
            Acompanhe as interações nos seus artigos, edite conteúdos e gerencie
            exclusões com segurança.
          </p>
        </div>
        <Button asChild className="action-btn w-fit text-white">
          <Link to="/article/new">Novo Artigo</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-2xl border border-border bg-card/70 p-4"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/50">
              {metric.label}
            </p>
            <p className="mt-3 text-2xl font-semibold text-foreground">
              {metric.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export const DashboardArticlesSection: React.FC<
  DashboardArticlesSectionProps
> = ({
  articles,
  currentPage,
  currentView,
  hasError,
  isLoading,
  totalPages,
  onDeleteArticle,
  onEditArticle,
  onOpenArticle,
  onPageChange,
  onViewChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Meus Artigos
          </h2>
          <p className="mt-1 text-sm text-foreground/60">
            Artigos que podem ser editados ou excluídos por você.
          </p>
        </div>
        <ArticlesViewToggle
          currentView={currentView}
          onViewChange={onViewChange}
        />
      </div>

      <section
        className={
          currentView === 'list'
            ? 'flex flex-col gap-4'
            : 'grid gap-4 lg:grid-cols-2'
        }
      >
        {isLoading || hasError ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <CustomSkeleton key={`dashboard-skeleton-${index}`} />
            ))}
          </>
        ) : (
          <>
            {articles.map((article) => {
              const actions = (
                <span
                  className="flex items-center gap-1 rounded-full border border-border/80 bg-background/80 p-1"
                  key={`${article.id}-actions`}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(event) => {
                      event.stopPropagation()
                      onEditArticle(article.id)
                    }}
                    className="h-8 w-8 text-primary hover:bg-primary/10 hover:text-primary"
                    aria-label={`Editar artigo ${article.title}`}
                    data-testid={`edit-btn-${article.id}`}
                  >
                    <PencilIcon />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(event) => {
                      event.stopPropagation()
                      onDeleteArticle({
                        id: article.id,
                        title: article.title,
                      })
                    }}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    aria-label={`Excluir artigo ${article.title}`}
                    data-testid={`delete-btn-${article.id}`}
                  >
                    <TrashIcon />
                  </Button>
                </span>
              )

              const footer = [
                <PublishedByInfo
                  avatar={article.author.image}
                  author={article.author.fullName}
                  publishedAt={article.publishedAt}
                  key={`${article.id}-published`}
                />,
                actions,
              ]

              const commonProps = {
                id: String(article.id),
                headerImageSrc: article.image,
                title: article.title,
                description: article.resume ?? article.content,
                category: article.category,
                onClick: () => onOpenArticle(article.id),
                footer,
              }

              if (currentView === 'list') {
                return <ArticleListCard key={article.id} {...commonProps} />
              }

              return (
                <CustomCard
                  key={article.id}
                  {...commonProps}
                  imageClassName="h-52 w-full object-cover"
                />
              )
            })}
          </>
        )}
      </section>

      {totalPages > 1 ? (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          className="mt-4"
          changePage={onPageChange}
        />
      ) : null}
    </div>
  )
}

export const DashboardRecentActivity: React.FC<
  DashboardRecentActivityProps
> = ({ articles, isLoading }) => {
  return (
    <aside className="rounded-3xl border border-border bg-card/60 p-6">
      <h2 className="text-xl font-semibold text-foreground">
        Atividade recente
      </h2>
      <p className="mt-1 text-sm text-foreground/60">
        Resumo dos artigos mais recentes publicados por você.
      </p>

      <div className="mt-6 space-y-4">
        {articles.slice(0, 3).map((article) => (
          <article
            key={`recent-${article.id}`}
            className="rounded-2xl border border-border bg-background/70 p-4"
          >
            <p className="text-sm font-medium text-foreground line-clamp-2">
              {article.title}
            </p>
            <p className="mt-2 text-xs text-foreground/60">
              {article.favouriteCount} curtidas recebidas
            </p>
            <p className="mt-1 text-xs text-foreground/50">
              Publicado em {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </article>
        ))}
        {!articles.length && !isLoading ? (
          <p className="text-sm text-foreground/60">
            Você ainda não publicou artigos.
          </p>
        ) : null}
      </div>
    </aside>
  )
}
