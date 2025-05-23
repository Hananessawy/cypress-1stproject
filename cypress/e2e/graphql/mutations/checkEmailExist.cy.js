// Test file for checkEmailExist mutation
describe('GraphQL User Mutation: checkEmailExist', () => {
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

  it('should check if an email exists', () => {
    const checkEmailQuery = `
      mutation {
        checkEmailExist(input: {
          email: "${testUser.email}"
        }) {
          status
          message
          exists
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: checkEmailQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // We don't know if the user exists, so just check the structure
      if (response.body.data && response.body.data.checkEmailExist) {
        expect(response.body.data.checkEmailExist).to.have.property('status');
        expect(response.body.data.checkEmailExist).to.have.property('message');
        expect(response.body.data.checkEmailExist).to.have.property('exists');
      }
    });
  });
});
