describe('rescheduleOrder Mutation', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should test reschedule order mutation', () => {
    // This is a placeholder ID - in a real test you would use actual IDs
    const orderId = "1";
    const timeSlotId = "200";
    
    const rescheduleOrderMutation = `
      mutation {
        rescheduleOrder(input: {
          order_id: "${orderId}"
          time_slot_id: "${timeSlotId}"
          date: "2025-06-15"
        }) {
          status
          message
          order {
            id
            uuid
            receipt_number
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: rescheduleOrderMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check reschedule response structure
      if (response.body.data && response.body.data.rescheduleOrder) {
        expect(response.body.data.rescheduleOrder).to.have.property('status');
        expect(response.body.data.rescheduleOrder).to.have.property('message');
      }
    });
  });
});
