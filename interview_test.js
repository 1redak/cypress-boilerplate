
const url = '/'

describe('interview test suite', () => {
    
    beforeEach(()=> { //step 4 from readme 
        cy.visit('/')
    })

    it('validate alert message is dispalyed for invalid login', () => {
        
        cy.contains('Login').click()
        cy.get('#email').clear().type('admin@google.com')
        cy.get('#password').clear().type('admin@google.com')
        cy.get('[type="submit"]').click()
        cy.get('.c-alert__text').should('have.text', 'Incorrect Email or Password')

    })

    it('validate the footer links exist and user can click privacy policy and navigate to the screen', () => {
        cy.get('[href="/demo"]').contains('GET STARTED').click()
        cy.scrollTo('bottom')
        cy.get('[class^="v7-heading-small v7-btn-flat-black v7-simple-footer-link"]').should('exist')
        cy.get('[class^="v7-heading-small v7-btn-flat-black v7-simple-footer-link"]').and('have.attr', 'href')
            .then((href) => {
                cy.visit(href)
                expect(href).contains('privacy-policy')
            })
    })

    it('validate user can access resources link and search for a topic of their choice.', () => {
        cy.get('.v7-btn-flat-black').contains('Browse Library').click()
        cy.url().should('contain','/resources')
        cy.get('[placeholder="Search..."]').should('exist').clear().type('Conversion ROAS').type('{enter}')
        cy.get('#js-load-more-content').children().should('have.length',8)
    })
})

