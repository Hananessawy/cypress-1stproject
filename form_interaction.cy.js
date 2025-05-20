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

    // Checkbox (optional — add if you want to practice interaction)
   cy.get('input[type="checkbox"][name="remember"]')
  .check()
  .should('be.checked')

    // Optional: Add a submit if you're targeting a real form
    cy.contains('Log in').click()
  })
})
