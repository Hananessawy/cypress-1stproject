// Test file for changeInvitationStatus mutation
describe('GraphQL Social Mutation: changeInvitationStatus', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should test change invitation status mutation', () => {
    // This is a placeholder - in a real test you would use valid parameters
    const friendId = "123";
    
    const changeInvitationStatusMutation = `
      mutation {
        changeInvitationStatus(input: {
          friend_id: "${friendId}"
          status: accept
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
      body: { query: changeInvitationStatusMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check invitation status change response structure
      if (response.body.data && response.body.data.changeInvitationStatus) {
        expect(response.body.data.changeInvitationStatus).to.have.property('status');
        expect(response.body.data.changeInvitationStatus).to.have.property('message');
      }
    });
  });
});
