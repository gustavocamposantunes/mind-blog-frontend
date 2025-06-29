import { createRoutesStub } from 'react-router-dom'

import { HomePage } from '../pages'

import { render } from './test-utils'

export const renderHomePageWithRouter = () => {
  const HomePageComponent = () => <HomePage />

  const Stub = createRoutesStub([
    {
      path: '/',
      Component: HomePageComponent,
    },
  ])

  render(<Stub initialEntries={['/']} />)
}
