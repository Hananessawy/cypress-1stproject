// Test file for addFriend mutation
describe('GraphQL Social Mutation: addFriend', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should test add friend mutation', () => {
    // This is a placeholder - in a real test you would use a valid user ID
    const userId = "123";
    
    const addFriendMutation = `
      mutation {
        addFriend(input: {
          friend_id: "${userId}"
        }) {
          status
          message
          friend {
            id
            status
            friend {
              id
              name
              email
            }
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: addFriendMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check add friend response structure
      if (response.body.data && response.body.data.addFriend) {
        expect(response.body.data.addFriend).to.have.property('status');
        expect(response.body.data.addFriend).to.have.property('message');
      }
    });
  });
});
