import { createRoutesStub } from 'react-router-dom'

import { ProfilePage } from '../pages'

import { render } from './test-utils'

import type { GetProfileSpy } from './mock-get-profile'
import type { PutProfileSpy } from './mock-put-profile'

export const renderProfilePageWithRouter = (
  getProfileSpy: GetProfileSpy,
  putProfileSpy: PutProfileSpy,
) => {
  const ProfilePageComponent = () => (
    <ProfilePage getProfile={getProfileSpy} updateProfile={putProfileSpy} />
  )

  const Stub = createRoutesStub([
    {
      path: '/profile',
      Component: ProfilePageComponent,
    },
  ])

  render(<Stub initialEntries={['/profile']} />)
}
