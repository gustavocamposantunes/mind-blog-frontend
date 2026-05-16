import { ArrowUpRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ErrorMessage, FavouriteSkeleton } from '../components/atoms'
import { PublishedByInfo } from '../components/molecules'
import { CustomCard } from '../components/organism/CustomCard'
import { Button } from '../components/ui/button'
import { Skeleton } from '../components/ui/skeleton'
import { useArticlesList, useResponsiveLimit } from '../hooks'

import type { ListArticlesUseCase } from '@/domain/usecases'

import { HomeTemplate } from '@/presentation/components/templates'

import 'swiper/css'

type HomePageProps = {
  listArticles: ListArticlesUseCase
}

export const HomePage: React.FC<HomePageProps> = ({ listArticles }) => {
  const navigate = useNavigate()
  const limit = useResponsiveLimit()
  const {
    error: errorFeatured,
    isLoading: isLoadingFeatured,
    data: dataFeatured,
  } = useArticlesList(listArticles, {
    page: 1,
    limit: 4,
  })
  const {
    error: errorRecent,
    isLoading: isLoadingRecent,
    data: dataRecent,
  } = useArticlesList(listArticles, {
    page: 1,
    limit: 6,
  })

  return (
    <HomeTemplate>
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-background via-background to-card/40 px-6 py-16 shadow-2xl shadow-black/10 md:px-12">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            Mind Blog
          </p>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Explore o Futuro da <span className="text-primary">Tecnologia</span>
          </h1>
          <p className="mt-4 text-sm text-foreground/70 md:text-base">
            Artigos sobre IA, desenvolvimento, DevOps e as ultimas tendencias
            tecnologicas.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="action-btn min-w-[190px] px-6 text-white"
            >
              <Link to={`/articles?page=1&limit=${limit}`}>
                Explorar Artigos
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="min-w-[190px] border-border px-6"
            >
              <Link to="/article/new">Comecar a Escrever</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Artigos em Destaque
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              Os melhores conteudos selecionados para voce
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            to={`/articles?page=1&limit=${limit}`}
          >
            Ver todos
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {errorFeatured ? <ErrorMessage error={errorFeatured} /> : null}
        {isLoadingFeatured ? (
          <FavouriteSkeleton />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {dataFeatured?.articles.map((article) => (
              <CustomCard
                key={article.id}
                id={String(article.id)}
                headerImageSrc={article.image}
                imageClassName="h-52 object-cover"
                title={article.title}
                description={article.content}
                category={article.category}
                onClick={() => {
                  navigate(`/articles/${article.id}`)
                }}
                footer={
                  <PublishedByInfo
                    avatar={article.author.avatar}
                    author={article.author.firstName}
                    publishedAt={article.publishedAt}
                  />
                }
              />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Artigos Recentes
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            Conteudo recente da comunidade
          </p>
        </div>

        {errorRecent ? <ErrorMessage error={errorRecent} /> : null}
        {isLoadingRecent ? (
          <Skeleton className="h-72 w-full" data-testid="skeleton-recent" />
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1.1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="recent-articles-swiper"
            data-testid="recent-articles-swiper"
          >
            {dataRecent?.articles.map((article) => (
              <SwiperSlide key={article.id}>
                <Link to={`/articles/${article.id}`} className="block h-full">
                  <article className="h-full overflow-hidden rounded-2xl border border-border bg-card/60 shadow-xl shadow-black/10 transition-transform hover:-translate-y-1">
                    <div className="h-40 w-full overflow-hidden">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted" />
                      )}
                    </div>
                    <div className="flex h-full flex-col gap-3 p-5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                        {article.category}
                      </span>
                      <h3 className="text-base font-semibold text-foreground">
                        {article.title}
                      </h3>
                      <p className="text-sm text-foreground/70">
                        {article.content}
                      </p>
                      <div className="mt-auto text-xs text-foreground/70">
                        <PublishedByInfo
                          avatar={article.author.avatar}
                          author={article.author.firstName}
                          publishedAt={article.publishedAt}
                        />
                      </div>
                    </div>
                  </article>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      <section className="rounded-3xl border border-border bg-gradient-to-r from-card/70 via-background to-card/70 px-6 py-12 text-center md:px-12">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border text-primary">
            <span className="text-lg">@</span>
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-foreground">
            Newsletter Semanal
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            Receba os melhores artigos de tecnologia diretamente no seu email.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="exemplo@email.com"
              className="w-full max-w-sm rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground focus:outline-none"
            />
            <Button className="action-btn bg-[#07B6D5] text-white hover:bg-[#07B6D5]/90">
              Inscrever
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card/60 px-6 py-12 text-center md:px-12">
        <h2 className="text-2xl font-semibold text-foreground">
          Compartilhe Seu Conhecimento
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Junte-se a nossa comunidade de escritores e compartilhe suas
          experiencias e conhecimentos em tecnologia.
        </p>
        <Button
          asChild
          className="action-btn mt-6 min-w-[220px] px-6 text-white"
        >
          <Link to="/register">Criar Conta Gratuita</Link>
        </Button>
      </section>
    </HomeTemplate>
  )
}
