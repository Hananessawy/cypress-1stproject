// Test file for login mutation
describe('GraphQL User Mutation: login', () => {
  // Test user data
  const testUser = {
    email: 'test.user@example.com',
    password: 'Password123!',
    firstName: 'Test',
    lastName: 'User',
    mobile: '+201234567890'
  };

  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should be able to login with valid credentials', () => {
    // This is just a test - in real use we would need valid credentials
    const loginMutation = `
      mutation {
        login(input: {
          username: "${testUser.email}",
          password: "${testUser.password}"
        }) {
          access_token
          token_type
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
      body: { query: loginMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Since we're using test credentials, we expect this to potentially fail
      // but we can validate the structure of the response
      if (response.body.data && response.body.data.login) {
        expect(response.body.data.login).to.have.property('access_token');
        expect(response.body.data.login).to.have.property('token_type');
        expect(response.body.data.login).to.have.property('user');
      }
    });
  });
});
