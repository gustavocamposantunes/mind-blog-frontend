import { createRoutesStub } from 'react-router-dom'

import { HomePage } from '../pages'

import { render } from './test-utils'

import type { GetNewsSpy } from './mock-get-news'

export const renderHomePageWithRouter = (getNewsSpy: GetNewsSpy) => {
  const HomePageComponent = () => <HomePage getNews={getNewsSpy} />

  const Stub = createRoutesStub([
    {
      path: '/',
      Component: HomePageComponent,
    },
  ])

  render(<Stub initialEntries={['/']} />)
}
