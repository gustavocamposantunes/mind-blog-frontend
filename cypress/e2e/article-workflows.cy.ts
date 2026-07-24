describe('Article detail and publishing workflows', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', url: 'http://mockoon.test/articles*' },
      { fixture: 'articles.json' },
    )
  })

  it('shows article comments and lets an authenticated reader comment and favorite', () => {
    cy.intercept(
      { method: 'GET', url: 'http://mockoon.test/articles/101*' },
      {
        fixture: 'article-101.json',
      },
    ).as('getArticle')
    cy.intercept(
      {
        method: 'GET',
        url: 'http://mockoon.test/comments/101/comments',
      },
      [
        {
          id: 1,
          content: 'Comentário existente sobre o artigo.',
          createdAt: '2026-07-22T12:00:00.000Z',
          user: {
            id: 9,
            fullName: 'Margaret Hamilton',
            image: '',
          },
        },
      ],
    ).as('listComments')
    cy.intercept(
      {
        method: 'POST',
        url: 'http://mockoon.test/articles/favorite',
      },
      {
        statusCode: 201,
        body: {
          articleId: 101,
          userId: 5,
          favourited: true,
        },
      },
    ).as('favoriteArticle')
    cy.intercept(
      { method: 'POST', url: 'http://mockoon.test/comments' },
      {
        statusCode: 201,
        body: {},
      },
    ).as('commentArticle')

    cy.visit('/')
    cy.loginAsTestUser()
    cy.visit('/articles/101')

    cy.wait('@getArticle')
    cy.contains('Arquitetura limpa no front-end').should('be.visible')
    cy.contains('Comentário existente sobre o artigo.').should('be.visible')

    cy.get('[data-testid="favourite-toogle"]').click()
    cy.wait('@favoriteArticle')
      .its('request.body')
      .should('deep.equal', { articleId: 101 })

    cy.findByLabelText('Comentário').type('Ótima leitura para o time.')
    cy.contains('button', 'Comentar').click()
    cy.wait('@commentArticle').its('request.body').should('deep.equal', {
      article_id: 101,
      content: 'Ótima leitura para o time.',
    })
  })

  it('publishes a new article with markdown preview and parsed tags', () => {
    cy.intercept(
      { method: 'POST', url: 'http://mockoon.test/articles' },
      {
        statusCode: 201,
        body: {},
      },
    ).as('createArticle')

    cy.visit('/')
    cy.loginAsTestUser()
    cy.visit('/article/new')

    cy.contains('h1', 'Criar Novo Artigo').should('be.visible')
    cy.findByLabelText('Título do Artigo *').type('Guia Cypress no Mind Blog')
    cy.findByLabelText('Resumo *').type(
      'Uma visão prática de testes e2e com Cypress.',
    )
    cy.findByLabelText('Categoria *').select('Desenvolvimento')
    cy.findByLabelText('Tags').type('cypress, testes, react')
    cy.findByLabelText('Conteúdo do Artigo *').type(
      '# Guia Cypress\n\nConteúdo em **Markdown**.',
    )
    cy.contains('h1', 'Guia Cypress').should('be.visible')
    cy.findByLabelText('Imagem de Capa *').selectFile(
      {
        contents: Cypress.Buffer.from('cypress-image'),
        fileName: 'cover.png',
        mimeType: 'image/png',
      },
      { force: true },
    )
    cy.get('[data-testid="selected-image"]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('match', /^data:image\/png;base64,/)

    cy.contains('button', 'Publicar Artigo').click()

    cy.wait('@createArticle').then(({ request }) => {
      expect(request.headers.authorization).to.match(/^Bearer /)
      expect(request.body).to.include({
        title: 'Guia Cypress no Mind Blog',
        resume: 'Uma visão prática de testes e2e com Cypress.',
        category: 'Desenvolvimento',
        author_id: 5,
      })
      expect(request.body.tags).to.deep.equal(['cypress', 'testes', 'react'])
      expect(request.body.image).to.match(/^data:image\/png;base64,/)
    })
    cy.location('pathname').should('eq', '/articles')
  })
})
