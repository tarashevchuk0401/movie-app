describe('Movie List', () => {
  beforeEach(() => {
    cy.fixture('movie-list.json').as('movieListJson')
    cy.intercept('http://localhost:3000/movie/list?page=1&pageSize=10', { fixture: 'movie-list.json' }).as('movieList')
    cy.visit('/home/list')
  })

  it('Visits the initial project page', () => {
    cy.visit('/home/list')
    cy.contains('The Shawshank Redemption')
    cy.contains('Items per page')
    cy.get('.movie-title').should('contain', 'The Shawshank Redemption')
    cy.get('.movie-card').should('have.length', 10)
  })

  it('should open edit mode', () => {
    cy.get('.edit-button').first().click()
    cy.get('.movie-edit').should('be.visible')
    cy.get('input').should('have.length', 6)
  })
  
  it('should redirect to movie details when clicking info button', () => {
    cy.get('mat-icon[fontIcon="info"]')
      .should('exist')
      .parent()
      .first()
      .click()

    cy.url().should('include', '/movie/1')
    cy.contains('Description')
    cy.intercept('http://localhost:3000/movie/item/1', { fixture: 'movie1.json' }).as('movie1')
    cy.wait('@movie1')
    cy.contains('The Shawshank Redemption')

  })

  it('should delete movie', () => {
    cy.get('.logo').click()

    cy.intercept('DELETE', 'http://localhost:3000/movie/item/1', {
      statusCode: 200,
      body: { id: 1 }
    }).as('deleteMovie')


    cy.get('mat-icon[fontIcon="delete"]')
      .should('exist')
      .parent()
      .first()
      .click()

    cy.wait('@deleteMovie', { timeout: 10000 })

    cy.get('.movie-card').should('have.length', 9)
  })

  it('should chenge list quantity', () => {

  })

  it('should change page size to 5 items', () => {
    cy.intercept('http://localhost:3000/movie/list?page=1&pageSize=5', {
      body: {
        data: [
          {
            "id": 1,
            "title": "The Shawshank Redemption",
            "year": 1994,
            "category": "Drama",
            "rating": 9.2,
            "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
          },
          {
            "id": 2,
            "title": "The Godfather",
            "year": 1972,
            "category": "Crime",
            "rating": 9.1,
            "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
          },
          {
            "id": 3,
            "title": "The Dark Knight",
            "year": 2008,
            "category": "Action",
            "rating": 9.0,
            "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
          },
          {
            "id": 4,
            "title": "Pulp Fiction",
            "year": 1994,
            "category": "Crime",
            "rating": 8.9,
            "description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
          },
          {
            "id": 5,
            "title": "Fight Club",
            "year": 1999,
            "category": "Drama",
            "rating": 8.8,
            "description": "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more."
          }
        ],
        total: 10
      }
    }).as('movieList5')

    cy.get('mat-paginator')
      .find('mat-select')
      .click({ force: true })

    cy.get('.mat-mdc-select-panel')
      .should('be.visible')
      .find('.mat-mdc-option')
      .contains('5')
      .click()

    cy.wait('@movieList5')

    cy.get('.movie-card').should('have.length', 5)
    
    cy.contains('The Shawshank Redemption')
    cy.contains('The Godfather')
    cy.contains('The Dark Knight')
    cy.contains('Pulp Fiction')
    cy.contains('Fight Club')

    cy.contains('Inception').should('not.exist')
  })
})