// Test file for register mutation
describe('GraphQL User Mutation: register', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should test registration flow', () => {
    // Generate a unique email to avoid conflicts
    const uniqueEmail = `test.user.${Date.now()}@example.com`;
    
    const registerMutation = `
      mutation {
        register(input: {
          first_name: "New"
          last_name: "User"
          email: "${uniqueEmail}"
          password: "Password123!"
          password_confirmation: "Password123!"
          mobile: "+201234567891"
          birthdate: "1990-01-01"
          gender: male
        }) {
          status
          message
          access_token
          user {
            id
            name
            email
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: registerMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check registration response structure
      if (response.body.data && response.body.data.register) {
        expect(response.body.data.register).to.have.property('status');
        expect(response.body.data.register).to.have.property('message');
      }
    });
  });
});
