import { buildAccessToken, testUser } from '../support/commands'

describe('Authentication and private routes', () => {
  it('redirects unauthenticated users away from private pages', () => {
    cy.visit('/dashboard')

    cy.location('pathname').should('eq', '/')
    cy.contains('Entrar').should('be.visible')
  })

  it('signs in, persists the session and signs out from the user menu', () => {
    cy.intercept(
      { method: 'GET', url: 'http://mockoon.test/articles*' },
      { fixture: 'articles.json' },
    )
    cy.intercept(
      { method: 'POST', url: 'http://mockoon.test/auth/login' },
      {
        statusCode: 200,
        body: {
          accessToken: buildAccessToken(testUser),
        },
      },
    ).as('login')

    cy.visit('/login')
    cy.findByLabelText('Email').type(testUser.email)
    cy.findByLabelText('Senha').type('correct-horse-battery-staple')
    cy.get('form').contains('button', 'Entrar').click()

    cy.wait('@login').its('request.body').should('deep.equal', {
      email: testUser.email,
      password: 'correct-horse-battery-staple',
    })
    cy.location('pathname').should('eq', '/')
    cy.get('[data-testid="dropdown-trigger"]').first().click()
    cy.contains(testUser.fullName).should('be.visible')
    cy.contains(testUser.email).should('be.visible')

    cy.contains('[role="menuitem"]', 'Sair').click()
    cy.contains('Entrar').should('be.visible')
    cy.window().its('localStorage.account').should('be.undefined')
  })

  it('validates password confirmation before creating an account', () => {
    cy.visit('/register')

    cy.findByLabelText('Nome Completo').type('Linus Torvalds')
    cy.findByLabelText('Email').type('linus@mindblog.test')
    cy.findByLabelText('Senha').type('strong-password')
    cy.findByLabelText('Confirmar Senha').type('different-password')
    cy.contains('button', 'Criar Conta').click()

    cy.contains('As senhas não coincidem').should('be.visible')
  })
})
