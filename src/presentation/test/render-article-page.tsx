import { createRoutesStub } from 'react-router-dom'

import { ArticlePage } from '../pages'

import { render } from './test-utils'

import type { FavouriteArticleSpy } from './mock-favourite-article'
import type { GetArticleByIdSpy } from './mock-get-article-by-id'
import type { UnfavouriteArticleSpy } from './mock-unfavourite-article'

export const renderArticlePageWithRouter = (
  getArticleByIdSpy: GetArticleByIdSpy,
  favouriteArticleSpy: FavouriteArticleSpy,
  unfavouriteArticleSpy: UnfavouriteArticleSpy,
) => {
  const ArticlePageComponent = () => (
    <ArticlePage
      getArticletById={getArticleByIdSpy}
      favouriteArticle={favouriteArticleSpy}
      unfavouriteArticle={unfavouriteArticleSpy}
    />
  )

  const Stub = createRoutesStub([
    {
      path: '/article/:id',
      Component: ArticlePageComponent,
    },
  ])

  render(<Stub initialEntries={['/article/:id']} />)
}
