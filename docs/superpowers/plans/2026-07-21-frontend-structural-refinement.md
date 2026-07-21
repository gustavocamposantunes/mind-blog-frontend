# Frontend Structural Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the frontend structure by centralizing HTTP response handling, extracting page-level rendering sections, and reducing broad typing/lint suppressions without changing visible behavior.

**Architecture:** Add small data-layer helpers for common HTTP success and error mapping, then update remote use cases to delegate repeated status handling. Extract page-local components for article cards/dashboard sections only where page files currently mix data, branching, and rendering logic.

**Tech Stack:** React, TypeScript, Vite, Vitest, Testing Library, ESLint, Tailwind CSS.

---

## File Structure

- Create: `src/data/usecases/http/handle-http-response.ts`
  - Single responsibility: map repeated `HttpStatusCode` cases to domain errors and build successful remote responses.
- Create: `src/data/usecases/http/handle-http-response.spec.ts`
  - Unit coverage for the helper.
- Create: `src/data/usecases/http/index.ts`
  - Re-export HTTP use case helpers.
- Modify: remote use cases under `src/data/usecases/**/remote-*.ts`
  - Remove repeated switch statements where the helper covers the same behavior.
- Create: `src/presentation/pages/components/ArticleCards.tsx`
  - Shared page card components for articles pages.
- Create: `src/presentation/pages/components/DashboardSections.tsx`
  - Dashboard metrics, article list rendering, and recent activity sections.
- Create: `src/presentation/pages/components/index.ts`
  - Re-export extracted page components.
- Modify: `src/presentation/pages/ArticlesPage.tsx`
  - Type article rendering and use extracted card components.
- Modify: `src/presentation/pages/HomePage.tsx`
  - Use extracted card component and keep home-specific sections readable.
- Modify: `src/presentation/pages/DashboardPage.tsx`
  - Use extracted dashboard sections.
- Modify: `src/presentation/utils/toBase64..spec.ts`
  - Replace broad lint suppressions with typed mocks.
- Modify: `src/presentation/test/mock-delete-article-by-id.ts`
  - Remove unused parameter suppression with a typed void usage or parameter omission if interface permits it.

## Commands

- Lint: `npm run lint`
- Tests: `./node_modules/.bin/vitest run --reporter verbose`
- Build: `npm run build`

---

### Task 1: Add Shared HTTP Response Helper

**Files:**
- Create: `src/data/usecases/http/handle-http-response.ts`
- Create: `src/data/usecases/http/handle-http-response.spec.ts`
- Create: `src/data/usecases/http/index.ts`

- [ ] **Step 1: Write the failing helper tests**

Create `src/data/usecases/http/handle-http-response.spec.ts`:

```ts
import { describe, expect, it } from 'vitest'

import {
  buildRemoteResponse,
  throwMappedHttpError,
} from './handle-http-response'

import { HttpStatusCode } from '@/data/protocols'
import {
  InternalServerError,
  InvalidCredentialsError,
  NotFoundError,
  UnexpectedError,
} from '@/domain/errors'

describe('HTTP use case response helpers', () => {
  it('builds a remote response with statusCode and data', () => {
    expect(buildRemoteResponse(HttpStatusCode.ok, { id: 1 })).toEqual({
      statusCode: HttpStatusCode.ok,
      data: { id: 1 },
    })
  })

  it('maps server errors', () => {
    expect(() => throwMappedHttpError(HttpStatusCode.serverError)).toThrow(
      InternalServerError,
    )
  })

  it('maps not found errors when enabled', () => {
    expect(() =>
      throwMappedHttpError(HttpStatusCode.notFound, {
        notFound: true,
      }),
    ).toThrow(NotFoundError)
  })

  it('maps unauthorized and forbidden errors when enabled', () => {
    expect(() =>
      throwMappedHttpError(HttpStatusCode.unauthorized, {
        credentials: true,
      }),
    ).toThrow(InvalidCredentialsError)

    expect(() =>
      throwMappedHttpError(HttpStatusCode.forbidden, {
        credentials: true,
      }),
    ).toThrow(InvalidCredentialsError)
  })

  it('maps unknown status codes to unexpected errors', () => {
    expect(() => throwMappedHttpError(HttpStatusCode.badRequest)).toThrow(
      UnexpectedError,
    )
  })
})
```

- [ ] **Step 2: Run the helper test and verify it fails**

Run:

```bash
./node_modules/.bin/vitest run src/data/usecases/http/handle-http-response.spec.ts --reporter verbose
```

Expected: FAIL because `handle-http-response.ts` does not exist.

- [ ] **Step 3: Implement the helper**

Create `src/data/usecases/http/handle-http-response.ts`:

```ts
import type { HttpRemoteResponse } from '@/data/protocols'
import { HttpStatusCode } from '@/data/protocols'
import {
  InternalServerError,
  InvalidCredentialsError,
  NotFoundError,
  UnexpectedError,
} from '@/domain/errors'

type MappedHttpErrorOptions = {
  credentials?: boolean
  notFound?: boolean
}

export const buildRemoteResponse = <Data>(
  statusCode: HttpStatusCode,
  data: Data,
): HttpRemoteResponse<Data> => ({
  statusCode,
  data,
})

export const throwMappedHttpError = (
  status: HttpStatusCode,
  options: MappedHttpErrorOptions = {},
): never => {
  if (status === HttpStatusCode.serverError) {
    throw new InternalServerError()
  }

  if (options.notFound && status === HttpStatusCode.notFound) {
    throw new NotFoundError()
  }

  if (
    options.credentials &&
    (status === HttpStatusCode.unauthorized ||
      status === HttpStatusCode.forbidden)
  ) {
    throw new InvalidCredentialsError()
  }

  throw new UnexpectedError()
}
```

Create `src/data/usecases/http/index.ts`:

```ts
export * from './handle-http-response'
```

- [ ] **Step 4: Run the helper test and verify it passes**

Run:

```bash
./node_modules/.bin/vitest run src/data/usecases/http/handle-http-response.spec.ts --reporter verbose
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/usecases/http
git commit -m "refactor: add remote response helpers"
```

---

### Task 2: Refactor Remote Use Cases

**Files:**
- Modify: `src/data/usecases/article/remote-get-article-by-id.ts`
- Modify: `src/data/usecases/comment/remote-comment-article.ts`
- Modify: `src/data/usecases/user/remote-get-profile.ts`
- Modify: `src/data/usecases/user/remote-update-profile.ts`
- Modify: remaining `src/data/usecases/**/remote-*.ts` files that still contain the same repeated `switch (status)` pattern after the focused use cases pass.

- [ ] **Step 1: Run focused remote use case tests as baseline**

Run:

```bash
./node_modules/.bin/vitest run src/data/usecases/article/remote-get-article-by-id.spec.ts src/data/usecases/comment/remote-comment-article.spec.ts src/data/usecases/user/remote-get-profile.spec.ts src/data/usecases/user/remote-update-profile.spec.ts --reporter verbose
```

Expected: PASS before refactoring. If a test fails before edits, record the exact failure and inspect it before modifying code.

- [ ] **Step 2: Refactor `RemoteGetArticleById`**

Replace direct domain error imports with:

```ts
import {
  buildRemoteResponse,
  throwMappedHttpError,
} from '@/data/usecases/http'
```

Replace the switch with:

```ts
    if (status === HttpStatusCode.ok) {
      return buildRemoteResponse(status, normalizeArticle(data as ArticleModel))
    }

    throwMappedHttpError(status, { notFound: true })
```

- [ ] **Step 3: Refactor `RemoteCommentArticle`**

Add:

```ts
import {
  buildRemoteResponse,
  throwMappedHttpError,
} from '@/data/usecases/http'
```

Replace the switch with:

```ts
    if (status === HttpStatusCode.created) {
      return buildRemoteResponse(status, undefined)
    }

    throwMappedHttpError(status, { credentials: true })
```

- [ ] **Step 4: Refactor profile use cases and remove unnecessary `Promise.resolve`**

For `src/data/usecases/user/remote-get-profile.ts`, replace the success case with:

```ts
    if (status === HttpStatusCode.ok) {
      return buildRemoteResponse(status, data as UserModel)
    }

    throwMappedHttpError(status)
```

For `src/data/usecases/user/remote-update-profile.ts`, use the same pattern with `HttpStatusCode.ok` and `UserModel`.

- [ ] **Step 5: Run focused remote tests**

Run:

```bash
./node_modules/.bin/vitest run src/data/usecases/article/remote-get-article-by-id.spec.ts src/data/usecases/comment/remote-comment-article.spec.ts src/data/usecases/user/remote-get-profile.spec.ts src/data/usecases/user/remote-update-profile.spec.ts --reporter verbose
```

Expected: PASS.

- [ ] **Step 6: Scan remaining repeated switches**

Run:

```bash
rg -n "switch \\(status\\)|Promise\\.resolve" src/data/usecases
```

Expected: no remaining `Promise.resolve` matches in production use cases. Remaining `switch (status)` matches are allowed only when a use case has status-specific behavior not covered by `buildRemoteResponse` and `throwMappedHttpError`.

- [ ] **Step 7: Commit**

```bash
git add src/data/usecases
git commit -m "refactor: reuse remote response handling"
```

---

### Task 3: Extract Article Page Card Components

**Files:**
- Create: `src/presentation/pages/components/ArticleCards.tsx`
- Create: `src/presentation/pages/components/index.ts`
- Modify: `src/presentation/pages/ArticlesPage.tsx`
- Modify: `src/presentation/pages/HomePage.tsx`
- Test: `src/presentation/pages/ArticlesPage.spec.tsx`
- Test: `src/presentation/pages/HomePage.spec.tsx`

- [ ] **Step 1: Run page tests as baseline**

Run:

```bash
./node_modules/.bin/vitest run src/presentation/pages/ArticlesPage.spec.tsx src/presentation/pages/HomePage.spec.tsx --reporter verbose
```

Expected: PASS before refactoring.

- [ ] **Step 2: Create shared article page card components**

Create `src/presentation/pages/components/ArticleCards.tsx`:

```tsx
import type { ReactNode } from 'react'

import { ArticleListCard } from '@/presentation/components/organism'
import { Card } from '@/presentation/components/ui/card'

type FeaturedArticleCardProps = {
  id: string
  title: string
  category?: string
  image?: string
  excerpt: string
  onClick(): void
  footer: ReactNode
  testId?: string
}

export const FeaturedArticleCard: React.FC<FeaturedArticleCardProps> = ({
  id,
  title,
  category,
  image,
  excerpt,
  onClick,
  footer,
  testId,
}) => (
  <Card
    onClick={onClick}
    data-testid={testId ?? `custom-card-${id}`}
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

type ResponsiveArticleCardProps = {
  view: 'grid' | 'list'
  id: string
  headerImageSrc?: string
  title: string
  description: string
  category?: string
  onClick(): void
  footer: ReactNode
}

export const ResponsiveArticleCard: React.FC<ResponsiveArticleCardProps> = ({
  view,
  id,
  headerImageSrc,
  title,
  description,
  category,
  onClick,
  footer,
}) => {
  if (view === 'list') {
    return (
      <ArticleListCard
        id={id}
        headerImageSrc={headerImageSrc}
        title={title}
        description={description}
        category={category}
        onClick={onClick}
        footer={footer}
      />
    )
  }

  return (
    <FeaturedArticleCard
      id={id}
      title={title}
      image={headerImageSrc}
      excerpt={description}
      category={category}
      onClick={onClick}
      footer={footer}
    />
  )
}
```

Create `src/presentation/pages/components/index.ts`:

```ts
export * from './ArticleCards'
```

- [ ] **Step 3: Refactor `ArticlesPage.tsx`**

Remove the local `FeaturedArticleCard`, `Card` import, and `any` card renderer.

Add:

```ts
import type { ArticleModel } from '@/domain/models'
import { ResponsiveArticleCard } from '@/presentation/pages/components'
```

Type the renderer:

```tsx
  const renderArticleCard = (article: ArticleModel) => {
    const isCurrentUser = user.id === article.author.id
    const description = article.resume ?? article.content
    const articleId = String(article.id)

    const footer = [
      <PublishedByInfo
        avatar={article.author.image}
        author={article.author.fullName}
        publishedAt={article.publishedAt}
        key={`${article.id}-${article.author.fullName}-info`}
      />,
      <span className="flex gap-2" key={`${article.id}-actions`}>
        <FavoriteButton
          articleId={article.id}
          isFavorited={article.favourited}
          isCurrentUserAndLoggedIn={!isCurrentUser && isLoggedIn}
          favoriteById={favoriteById}
        />
      </span>,
    ]

    return (
      <ResponsiveArticleCard
        key={article.id}
        view={currentView}
        id={articleId}
        headerImageSrc={article.image}
        title={article.title}
        description={description}
        category={article.category}
        onClick={() => {
          navigate(`/articles/${article.id}`)
        }}
        footer={footer}
      />
    )
  }
```

- [ ] **Step 4: Refactor `HomePage.tsx`**

Remove local `HomeArticleCard`, `Card` import, and duplicate card markup.

Import:

```ts
import { FeaturedArticleCard } from '@/presentation/pages/components'
```

Replace each `HomeArticleCard` usage with:

```tsx
<FeaturedArticleCard
  key={article.id}
  id={String(article.id)}
  testId={`home-featured-article-card-${article.id}`}
  image={article.image}
  title={article.title}
  excerpt={getHomeArticleExcerpt(article.resume || article.content)}
  category={article.category}
  onClick={() => {
    navigate(`/articles/${article.id}`)
  }}
  footer={
    <PublishedByInfo
      avatar={article.author.image}
      author={article.author.fullName}
      publishedAt={article.publishedAt}
    />
  }
/>
```

Use `home-recent-article-card-${article.id}` for the recent section `testId`.

- [ ] **Step 5: Run page tests**

Run:

```bash
./node_modules/.bin/vitest run src/presentation/pages/ArticlesPage.spec.tsx src/presentation/pages/HomePage.spec.tsx --reporter verbose
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/presentation/pages/components src/presentation/pages/ArticlesPage.tsx src/presentation/pages/HomePage.tsx
git commit -m "refactor: extract article page card components"
```

---

### Task 4: Extract Dashboard Sections

**Files:**
- Create: `src/presentation/pages/components/DashboardSections.tsx`
- Modify: `src/presentation/pages/components/index.ts`
- Modify: `src/presentation/pages/DashboardPage.tsx`
- Test: `src/presentation/pages/DashboardPage.spec.tsx`

- [ ] **Step 1: Run dashboard page tests as baseline**

Run:

```bash
./node_modules/.bin/vitest run src/presentation/pages/DashboardPage.spec.tsx --reporter verbose
```

Expected: PASS before refactoring.

- [ ] **Step 2: Create dashboard section components**

Create `src/presentation/pages/components/DashboardSections.tsx` with:

```tsx
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ArticlesViewToggle, CustomSkeleton } from '@/presentation/components/atoms'
import { PublishedByInfo } from '@/presentation/components/molecules'
import {
  ArticleListCard,
  CustomCard,
  CustomPagination,
} from '@/presentation/components/organism'
import { Button } from '@/presentation/components/ui/button'

import type { ArticleModel } from '@/domain/models'

type DashboardMetric = {
  label: string
  value: string
}

export const DashboardHero: React.FC<{
  fullName: string
  metrics: DashboardMetric[]
}> = ({ fullName, metrics }) => (
  <section className="mb-10 flex flex-col gap-6 rounded-3xl border border-border bg-linear-to-br from-background via-background to-card/40 px-6 py-8 shadow-xl shadow-black/10 md:px-10">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
          Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Bem-vindo de volta, {fullName}
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

export const DashboardArticlesSection: React.FC<{
  articles: ArticleModel[]
  currentView: 'grid' | 'list'
  currentPage: number
  totalPages: number
  isLoading: boolean
  hasError: boolean
  onViewChange(view: 'grid' | 'list'): void
  onPageChange(page: number): void
  onArticleClick(articleId: number): void
  onEdit(articleId: number): void
  onDelete(article: { id: number; title: string }): void
}> = ({
  articles,
  currentView,
  currentPage,
  totalPages,
  isLoading,
  hasError,
  onViewChange,
  onPageChange,
  onArticleClick,
  onEdit,
  onDelete,
}) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Meus Artigos</h2>
        <p className="mt-1 text-sm text-foreground/60">
          Artigos que podem ser editados ou excluídos por você.
        </p>
      </div>
      <ArticlesViewToggle currentView={currentView} onViewChange={onViewChange} />
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
                    onEdit(article.id)
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
                    onDelete({ id: article.id, title: article.title })
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
              onClick: () => onArticleClick(article.id),
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

export const DashboardRecentActivity: React.FC<{
  articles: ArticleModel[]
  isLoading: boolean
}> = ({ articles, isLoading }) => (
  <aside className="rounded-3xl border border-border bg-card/60 p-6">
    <h2 className="text-xl font-semibold text-foreground">Atividade recente</h2>
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
```

- [ ] **Step 3: Re-export dashboard components**

Update `src/presentation/pages/components/index.ts`:

```ts
export * from './ArticleCards'
export * from './DashboardSections'
```

- [ ] **Step 4: Refactor `DashboardPage.tsx`**

Remove imports that moved into `DashboardSections.tsx`:

```ts
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArticlesViewToggle, CustomSkeleton } from '../components/atoms'
import { DeleteArticleModal, Footer, PublishedByInfo } from '../components/molecules'
import { ArticleListCard, CustomCard } from '../components/organism'
import { Button } from '../components/ui/button'
import { CustomPagination } from '@/presentation/components/organism'
```

Keep:

```ts
import { DeleteArticleModal, Footer } from '../components/molecules'
```

Add:

```ts
import {
  DashboardArticlesSection,
  DashboardHero,
  DashboardRecentActivity,
} from '@/presentation/pages/components'
```

Replace the hero section with:

```tsx
<DashboardHero fullName={user.fullName} metrics={metrics} />
```

Replace the main grid contents with:

```tsx
<section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
  <DashboardArticlesSection
    articles={articles}
    currentView={currentView}
    currentPage={currentPage}
    totalPages={totalPages}
    isLoading={isLoading}
    hasError={!!error}
    onViewChange={(view) => updateFilters({ view, page: 1 })}
    onPageChange={(page) => updateFilters({ page })}
    onArticleClick={(articleId) => navigate(`/articles/${articleId}`)}
    onEdit={(articleId) => navigate(`/article/edit/${articleId}`)}
    onDelete={setSelectedArticle}
  />
  <DashboardRecentActivity articles={articles} isLoading={isLoading} />
</section>
```

- [ ] **Step 5: Run dashboard page tests**

Run:

```bash
./node_modules/.bin/vitest run src/presentation/pages/DashboardPage.spec.tsx --reporter verbose
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/presentation/pages/components src/presentation/pages/DashboardPage.tsx
git commit -m "refactor: extract dashboard page sections"
```

---

### Task 5: Remove Avoidable Test Lint Suppressions

**Files:**
- Modify: `src/presentation/utils/toBase64..spec.ts`
- Modify: `src/presentation/test/mock-delete-article-by-id.ts`

- [ ] **Step 1: Run focused tests as baseline**

Run:

```bash
./node_modules/.bin/vitest run src/presentation/utils/toBase64..spec.ts src/presentation/pages/DashboardPage.spec.tsx --reporter verbose
```

Expected: PASS before refactoring.

- [ ] **Step 2: Replace broad `any` in `toBase64..spec.ts`**

Remove:

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
```

Add a typed mock class:

```ts
type FileReaderEvent = ProgressEvent<FileReader>

class MockFileReader {
  result: string | ArrayBuffer | null = null
  onload: ((event: FileReaderEvent) => void) | null = null
  onerror: ((event: FileReaderEvent) => void) | null = null

  readAsDataURL = vi.fn((_file: File) => {
    this.result = 'data:text/plain;base64,dGVzdA=='
    this.onload?.({ target: this } as FileReaderEvent)
  })
}
```

Use this class in the tests instead of `this: any`. For the error path:

```ts
mockFileReader.readAsDataURL = vi.fn((_file: File) => {
  mockFileReader.onerror?.({
    target: {
      error: new Error('read error'),
    },
  } as FileReaderEvent)
})
```

- [ ] **Step 3: Remove unused-parameter suppression from delete mock**

Remove the file-level disable in `src/presentation/test/mock-delete-article-by-id.ts`.

Change the method body to use the parameter intentionally:

```ts
  async deleteById(id: number): Promise<void> {
    void id
    return Promise.resolve()
  }
```

- [ ] **Step 4: Run focused tests**

Run:

```bash
./node_modules/.bin/vitest run src/presentation/utils/toBase64..spec.ts src/presentation/pages/DashboardPage.spec.tsx --reporter verbose
```

Expected: PASS.

- [ ] **Step 5: Run lint**

Run:

```bash
npm run lint
```

Expected: PASS with 0 ESLint errors.

- [ ] **Step 6: Commit**

```bash
git add src/presentation/utils/toBase64..spec.ts src/presentation/test/mock-delete-article-by-id.ts
git commit -m "refactor: tighten frontend test typing"
```

---

### Task 6: Final Frontend Verification

**Files:**
- No planned source edits unless verification exposes a defect.

- [ ] **Step 1: Run lint**

Run:

```bash
npm run lint
```

Expected: PASS with 0 ESLint errors.

- [ ] **Step 2: Run tests**

Run:

```bash
./node_modules/.bin/vitest run --reporter verbose
```

Expected: PASS.

- [ ] **Step 3: Run build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 4: Commit verification fixes if any were needed**

```bash
git status --short
```

If verification changes only frontend refinement files from this plan, stage the exact planned paths and commit them:

```bash
git add src/data/usecases src/presentation/pages/components src/presentation/pages/ArticlesPage.tsx src/presentation/pages/HomePage.tsx src/presentation/pages/DashboardPage.tsx src/presentation/utils/toBase64..spec.ts src/presentation/test/mock-delete-article-by-id.ts
git commit -m "fix: resolve frontend refinement regressions"
```

Skip this commit when `git status --short` is empty.
