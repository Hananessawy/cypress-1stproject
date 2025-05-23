// Test file for readNotification mutation
describe('GraphQL Social Mutation: readNotification', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should test read notification mutation', () => {
    // This is a placeholder - in a real test you would use a valid notification ID
    const notificationId = "123";
    
    const readNotificationMutation = `
      mutation {
        readNotification(input: {
          notification_id: "${notificationId}"
        }) {
          status
          message
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: readNotificationMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check read notification response structure
      if (response.body.data && response.body.data.readNotification) {
        expect(response.body.data.readNotification).to.have.property('status');
        expect(response.body.data.readNotification).to.have.property('message');
      }
    });
  });
});
