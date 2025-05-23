// Test file for 'me' query
describe('GraphQL User Query: me', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should query user profile information', () => {
    // Query the user's profile information
    const profileQuery = `
      {
        me {
          id
          name
          email
          mobile
          mobile_verified_at
          is_active
          wallet {
            id
            balance
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: profileQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // If user is authenticated, check profile structure
      if (response.body.data && response.body.data.me) {
        expect(response.body.data.me).to.have.property('id');
        expect(response.body.data.me).to.have.property('name');
        expect(response.body.data.me).to.have.property('email');
      }
    });
  });
});
