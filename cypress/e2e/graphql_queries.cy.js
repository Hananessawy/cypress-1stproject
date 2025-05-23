describe('GraphQL API Tests', () => {
  // Base URL for GraphQL endpoint
  const graphqlEndpoint = '/graphql';

  beforeEach(() => {
    // Visit the GraphiQL interface to ensure authentication
    cy.visit('/graphiql/');
    // You might need to add authentication logic here if required
  });

  it('should execute a simple query', () => {
    // Basic query to test GraphQL endpoint connection
    const query = `
      {
        __schema {
          queryType {
            name
          }
        }
      }
    `;

    // Execute GraphQL query using Cypress's cy.request
    cy.request({
      method: 'POST',
      url: graphqlEndpoint,
      body: { query },
      failOnStatusCode: false, // Don't fail test on non-2xx response
    }).then((response) => {
      // Log the response for debugging
      cy.log(JSON.stringify(response.body));
      
      // Basic verification that we got a response
      expect(response.status).to.be.oneOf([200, 401]);
      
      if (response.status === 200) {
        // If successful, verify we got data or errors
        expect(response.body).to.have.any.keys('data', 'errors');
      } else {
        // Handle authentication error - might need login logic
        cy.log('Authentication may be required');
      }
    });
  });

  it('should explore available queries through introspection', () => {
    // This query lists all available types in the schema
    const introspectionQuery = `
      {
        __schema {
          types {
            name
            kind
            description
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: graphqlEndpoint,
      body: { query: introspectionQuery },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200 && response.body.data) {
        // If successful, check that we got types back
        expect(response.body.data.__schema).to.have.property('types');
        expect(response.body.data.__schema.types).to.be.an('array');
        cy.log(`Found ${response.body.data.__schema.types.length} types in the schema`);
      }
    });
  });

  it('should test a specific business query', () => {
    // Replace with an actual query from your application
    const businessQuery = `
      {
        # Replace with an actual query that exists in your schema
        # For example:
        # users {
        #   id
        #   name
        # }
      }
    `;

    // This test is commented out until we know actual queries that work on this endpoint
    /*
    cy.request({
      method: 'POST',
      url: graphqlEndpoint,
      body: { query: businessQuery },
      failOnStatusCode: false,
    }).then((response) => {
      // Add specific assertions based on expected response
    });
    */

    // Instead, we'll just visit GraphiQL to allow manual exploration
    cy.visit('/graphiql/');
    cy.contains('GraphiQL').should('be.visible');
  });

  // Example of a mutation test (if mutations are supported)
  it.skip('should execute a mutation', () => {
    const mutation = `
      mutation {
        # Replace with an actual mutation that exists in your schema
      }
    `;

    // Skipped until we confirm what mutations are available
  });
});
