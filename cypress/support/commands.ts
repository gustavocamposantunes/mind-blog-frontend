type TestUser = {
  id: number
  fullName: string
  email: string
  image?: string
}

const toBase64Url = (value: string) =>
  btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')

export const buildAccessToken = (user: TestUser) => {
  const header = toBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = toBase64Url(
    JSON.stringify({
      sub: user.id,
      fullName: user.fullName,
      email: user.email,
      image: user.image,
    }),
  )

  return `${header}.${body}.signature`
}

export const testUser: TestUser = {
  id: 5,
  fullName: 'Ada Lovelace',
  email: 'ada@mindblog.test',
  image: '',
}

Cypress.Commands.add('loginAsTestUser', () => {
  const account = {
    accessToken: buildAccessToken(testUser),
    user: testUser,
  }

  cy.window().then((window) => {
    window.localStorage.setItem('account', JSON.stringify(account))
  })
})

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      loginAsTestUser(): Chainable<void>
    }
  }
}
