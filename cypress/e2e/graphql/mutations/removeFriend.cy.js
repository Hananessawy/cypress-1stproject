// Test file for removeFriend mutation
describe('GraphQL Social Mutation: removeFriend', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should test remove friend mutation', () => {
    // This is a placeholder - in a real test you would use a valid friend relationship ID
    const friendId = "123";
    
    const removeFriendMutation = `
      mutation {
        removeFriend(input: {
          friend_id: "${friendId}"
        }) {
          status
          message
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: removeFriendMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check remove friend response structure
      if (response.body.data && response.body.data.removeFriend) {
        expect(response.body.data.removeFriend).to.have.property('status');
        expect(response.body.data.removeFriend).to.have.property('message');
      }
    });
  });
});
