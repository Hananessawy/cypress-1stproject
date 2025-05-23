// ***********************************************
// Custom commands for GraphQL testing
// ***********************************************

/**
 * Execute a GraphQL query and return the response
 * @example
 * cy.executeGraphQL({
 *   query: `{ users { id name } }`,
 *   variables: { limit: 10 }
 * }).then(response => {
 *   // do something with response
 * })
 */
Cypress.Commands.add('executeGraphQL', (options = {}) => {
  const { query, variables = {}, operationName = null } = options;
  
  return cy.request({
    method: 'POST',
    url: '/graphql',
    body: {
      query,
      variables,
      operationName
    },
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json'
    }
  });
});

/**
 * Visit GraphiQL interface and execute a query
 * @example
 * cy.visitGraphiQL(`{ users { id name } }`)
 */
Cypress.Commands.add('visitGraphiQL', (query = null) => {
  cy.visit('/graphiql/');
  
  if (query) {
    // Wait for GraphiQL to load
    cy.get('.CodeMirror').should('be.visible');
    
    // Type query into the editor
    cy.get('.CodeMirror textarea')
      .first()
      .type('{selectall}{backspace}', { force: true })
      .type(query, { force: true, parseSpecialCharSequences: false });
    
    // Click the execute button
    cy.get('.execute-button').click();
  }
});
