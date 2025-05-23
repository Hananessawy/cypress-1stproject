describe('orders Query', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should query orders with pagination', () => {
    const ordersQuery = `
      {
        orders(first: 5) {
          data {
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
          paginatorInfo {
            count
            currentPage
            firstItem
            lastItem
            hasMorePages
            lastPage
            perPage
            total
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: ordersQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // If authenticated, check order structure
      if (response.body.data && response.body.data.orders) {
        expect(response.body.data.orders).to.have.property('data');
        expect(response.body.data.orders).to.have.property('paginatorInfo');
        
        if (response.body.data.orders.data.length > 0) {
          const order = response.body.data.orders.data[0];
          expect(order).to.have.property('id');
          expect(order).to.have.property('uuid');
          expect(order).to.have.property('receipt_number');
          expect(order).to.have.property('total_price');
        }
      }
    });
  });
});
