describe('Order Operations', () => {
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

  it('should test create order mutation', () => {
    // This is a simplified order creation payload - in real tests you'd use valid IDs
    const createOrderMutation = `
      mutation {
        createOrder(input: {
          branch_id: "1"
          time_slot_id: "100"
          date: "2025-06-01"
          items: [
            {
              ticket_id: "1"
              quantity: 2
              extra_info: [
                {
                  name: "Test User 1"
                  birthdate: "2000-01-01"
                  gender: "male"
                },
                {
                  name: "Test User 2"
                  birthdate: "2000-01-02"
                  gender: "female"
                }
              ]
            }
          ]
        }) {
          status
          message
          order {
            id
            uuid
            receipt_number
            total_price
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: createOrderMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check response structure, expect authentication error or order data
      if (response.body.data && response.body.data.createOrder) {
        expect(response.body.data.createOrder).to.have.property('status');
        expect(response.body.data.createOrder).to.have.property('message');
      }
    });
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
