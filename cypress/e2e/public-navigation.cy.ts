describe('Public navigation and articles discovery', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', url: 'http://mockoon.test/articles*' },
      { fixture: 'articles.json' },
    ).as('listArticles')
  })

  it('loads the home page and opens the article detail from a featured card', () => {
    cy.visit('/')

    cy.contains('h1', 'Explore o Futuro da Tecnologia').should('be.visible')
    cy.wait('@listArticles')
    cy.contains('Arquitetura limpa no front-end').click()

    cy.location('pathname').should('eq', '/articles/101')
  })

  it('keeps article filters in the URL and requests filtered results', () => {
    cy.visit('/articles?page=1&limit=6')
    cy.wait('@listArticles')

    cy.findByLabelText('Buscar por Título').clear().type('a')
    cy.location('search').should('include', 'title=a')
    cy.wait('@listArticles').its('request.query').should('include', {
      title: 'a',
    })

    cy.findByLabelText('Categoria').select('Desenvolvimento')
    cy.location('search').should('include', 'category=Desenvolvimento')
    cy.wait('@listArticles').its('request.query').should('include', {
      title: 'a',
      category: 'Desenvolvimento',
    })

    cy.contains('button', 'Lista').click()
    cy.location('search').should('include', 'view=list')
  })
})
