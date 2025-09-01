import { createRoutesStub } from 'react-router-dom'

import { ProfilePage } from '../pages'

import { render } from './test-utils'

import type { GetProfileSpy } from './mock-get-profile'
import type { UpdateProfileSpy } from './mock-update-profile'

export const renderProfilePageWithRouter = (
  getProfileSpy: GetProfileSpy,
  updateProfileSpy: UpdateProfileSpy,
) => {
  const ProfilePageComponent = () => (
    <ProfilePage getProfile={getProfileSpy} updateProfile={updateProfileSpy} />
  )

  const Stub = createRoutesStub([
    {
      path: '/profile',
      Component: ProfilePageComponent,
    },
  ])

  render(<Stub initialEntries={['/profile']} />)
}
