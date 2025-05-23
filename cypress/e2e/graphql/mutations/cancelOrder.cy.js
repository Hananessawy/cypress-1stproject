describe('cancelOrder Mutation', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should test cancel order mutation', () => {
    // This is a placeholder ID - in a real test you would use an actual order ID
    const orderId = "1";
    
    const cancelOrderMutation = `
      mutation {
        cancelOrder(input: {
          order_id: "${orderId}"
        }) {
          status
          message
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: cancelOrderMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check cancel order response structure
      if (response.body.data && response.body.data.cancelOrder) {
        expect(response.body.data.cancelOrder).to.have.property('status');
        expect(response.body.data.cancelOrder).to.have.property('message');
      }
    });
  });
});
