//// Cypress login test updated on May 25

describe('Form interaction test', () => {
  it('fills out form and submits', () => {
    cy.visit('https://salahub.ninja/login')

    // Email field
      cy.get('#email')
      .type('hanan.essawy1811@gmail.com')
      .should('have.value', 'hanan.essawy1811@gmail.com')

    // Password field
 cy.get('#password')
  .type('12345@Abc')
  .should('have.value', '12345@Abc')

    // Checkbox 
   cy.get('input[type="checkbox"][name="remember"]')
  .check()
  .should('be.checked')

    // submit button
    cy.contains('Log in').click()

// Verify that the user is redirected to the dashboard
    cy.url().should('include', '/dashboard')
    //navigate to the dropdown menu
    cy.get('.dropdown-toggle').click()
    // Verify that the dropdown menu is visible   
    cy.get('.dropdown-menu').should('be.visible')
    // Verify that the dropdown menu contains the logout button 
    cy.get('.dropdown-menu').contains('Logout').should('be.visible')
    // Click the logout button
    cy.get('.dropdown-menu').contains('Logout').click() 
    // Verify that the user is redirected to the login page
    cy.url().should('include', '/login')  




 //negative test case
    cy.visit('https://salahub.ninja/login')

    // Email field with invalid input
    cy.get('#email')
      .type('123@test.com')
      .should('have.value', '123@test.com')

    // Password field with invalid input
    cy.get('#password')
      .type('12345@Abc')
      .should('have.value', '12345@Abc')

    // Checkbox 
    cy.get('input[type="checkbox"][name="remember"]')
      .check()
      .should('be.checked')

    // submit button
    cy.contains('Log in').click()

    // Verify that the user sees an error message
cy.contains('These credentials', { timeout: 6000 }).should('be.visible')
  // Verify that the user is still on the login page
    cy.url().should('include', '/login')  



  })
})
