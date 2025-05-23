describe('order Query', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should query a specific order by ID', () => {
    // This is a placeholder ID - in a real test you would use an actual order ID
    const orderId = "1"; 
    
    const orderQuery = `
      {
        order(id: "${orderId}") {
          id
          uuid
          receipt_number
          total_price
          status
          created_at
          tickets {
            id
            name
            unit_price
          }
          branch {
            id
            name
          }
          brand {
            id
            name
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: orderQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // If the order exists and user is authenticated, check structure
      if (response.body.data && response.body.data.order) {
        expect(response.body.data.order).to.have.property('id');
        expect(response.body.data.order).to.have.property('uuid');
        expect(response.body.data.order).to.have.property('receipt_number');
      }
    });
  });
});
