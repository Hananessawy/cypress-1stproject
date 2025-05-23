// Test file for notifications query
describe('GraphQL Social Query: notifications', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should query notifications', () => {
    const notificationsQuery = `
      {
        notifications(first: 10) {
          data {
            id
            title
            body
            is_read
            type
            data {
              order_id
              friend_id
              friend_name
              friend_email
            }
            created_at
          }
          paginatorInfo {
            count
            currentPage
            total
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: notificationsQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check notifications response structure
      if (response.body.data && response.body.data.notifications) {
        expect(response.body.data.notifications).to.have.property('data');
        expect(response.body.data.notifications).to.have.property('paginatorInfo');
        
        if (response.body.data.notifications.data.length > 0) {
          const notification = response.body.data.notifications.data[0];
          expect(notification).to.have.property('id');
          expect(notification).to.have.property('title');
          expect(notification).to.have.property('body');
          expect(notification).to.have.property('is_read');
        }
      }
    });
  });
});
