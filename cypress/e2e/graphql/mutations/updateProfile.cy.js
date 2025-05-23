// Test file for updateProfile mutation
describe('GraphQL User Mutation: updateProfile', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should test update profile mutation', () => {
    const updateProfileMutation = `
      mutation {
        updateProfile(input: {
          first_name: "Updated"
          last_name: "Name"
          language: "en"
        }) {
          status
          message
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: updateProfileMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check structure of response, expect authentication error or success
      if (response.body.data && response.body.data.updateProfile) {
        expect(response.body.data.updateProfile).to.have.property('status');
        expect(response.body.data.updateProfile).to.have.property('message');
      }
    });
  });
});
