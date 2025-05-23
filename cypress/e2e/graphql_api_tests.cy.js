describe('GraphQL API Direct Tests', () => {
  it('should make a direct GraphQL request', () => {
    cy.executeGraphQL({
      query: `
        {
          __schema {
            queryType {
              name
            }
          }
        }
      `
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      
      // Basic verification - either we get data or an auth error
      expect(response.status).to.be.oneOf([200, 401]);
      
      if (response.status === 200) {
        expect(response.body).to.have.any.keys('data', 'errors');
      }
    });
  });

  it('should handle variables in GraphQL requests', () => {
    // Example with variables - update the query to match your actual schema
    const query = `
      query ExampleWithVariables($limit: Int) {
        __schema {
          types(first: $limit) {
            name
          }
        }
      }
    `;

    const variables = {
      limit: 5
    };

    cy.executeGraphQL({
      query,
      variables
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      
      // Add assertions based on your expected response
      expect(response.status).to.be.oneOf([200, 401]);
    });
  });

  it('should test error handling', () => {
    // Deliberately malformed query to test error handling
    const badQuery = `
      {
        nonExistentField {
          someProperty
        }
      }
    `;

    cy.executeGraphQL({
      query: badQuery
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      
      // Expect either an error response from GraphQL or auth error
      expect(response.status).to.be.oneOf([200, 400, 401]);
      
      if (response.status === 200) {
        // GraphQL returns 200 even for query errors, but includes an errors array
        expect(response.body).to.have.property('errors');
      }
    });
  });

  // The following test is a template you can customize once you know the actual schema
  /*
  it('should fetch actual business data', () => {
    // Replace with a query that's valid for your schema
    const query = `
      query {
        users {
          id
          name
          email
        }
      }
    `;

    cy.executeGraphQL({
      query
    }).then((response) => {
      // Add assertions specific to your business data
      expect(response.status).to.equal(200);
      expect(response.body.data).to.have.property('users');
      expect(response.body.data.users).to.be.an('array');
    });
  });
  */
});
