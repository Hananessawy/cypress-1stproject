describe('GraphQL Schema Explorer', () => {
  it('should load the GraphiQL interface', () => {
    cy.visitGraphiQL();
    cy.contains('GraphiQL').should('be.visible');
    cy.get('.topBar').should('be.visible');
    cy.get('.docExplorerShow').should('be.visible');
  });

  it('should explore schema with introspection query', () => {
    const introspectionQuery = `
      query IntrospectionQuery {
        __schema {
          queryType {
            name
          }
          mutationType {
            name
          }
          subscriptionType {
            name
          }
          types {
            kind
            name
            description
          }
        }
      }
    `;

    cy.visitGraphiQL(introspectionQuery);
    
    // Let's wait for the response and save it for documentation
    cy.get('.result-window').should('be.visible');
    
    // Note: In a real test we would parse the response and validate schema elements
    // But for this example we just want to confirm the query works
    cy.get('.result-window')
      .invoke('text')
      .then((text) => {
        // Save the schema information to a fixture file for reference
        try {
          const response = JSON.parse(text);
          if (response.data && response.data.__schema) {
            cy.log(`Schema loaded with ${response.data.__schema.types.length} types`);
            // Here we would normally validate specific schema expectations
          }
        } catch (e) {
          cy.log('Could not parse schema response');
        }
      });
  });

  it('should document available queries', () => {
    // Query to fetch just the query operations available
    const queriesExplorerQuery = `
      {
        __schema {
          queryType {
            fields {
              name
              description
              args {
                name
                description
                type {
                  name
                  kind
                }
              }
              type {
                name
                kind
              }
            }
          }
        }
      }
    `;

    cy.visitGraphiQL(queriesExplorerQuery);
    
    // Let's wait for the response
    cy.get('.result-window').should('be.visible');
    
    // In a real test we would now validate specific query operations are available
  });

  it('should document available mutations', () => {
    // Query to fetch just the mutation operations available
    const mutationsExplorerQuery = `
      {
        __schema {
          mutationType {
            fields {
              name
              description
              args {
                name
                description
                type {
                  name
                  kind
                }
              }
              type {
                name
                kind
              }
            }
          }
        }
      }
    `;

    cy.visitGraphiQL(mutationsExplorerQuery);
    
    // Let's wait for the response
    cy.get('.result-window').should('be.visible');
    
    // In a real test we would now validate specific mutation operations are available
  });
  
  // Uncomment and customize this test once you know what operations you want to test
  /*
  it('should execute a business query', () => {
    // Replace with an actual query that works in your schema
    const businessQuery = `
      query {
        // Real query here
        // For example: users(limit: 10) { id name email }
      }
    `;
    
    cy.visitGraphiQL(businessQuery);
    
    // Add specific assertions based on the expected response
  });
  */
});
