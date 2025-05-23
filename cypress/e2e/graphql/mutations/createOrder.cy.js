describe('createOrder Mutation', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
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
});
