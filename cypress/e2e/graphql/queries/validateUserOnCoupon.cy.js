// Test file for validateUserOnCoupon query
describe('GraphQL Coupon Query: validateUserOnCoupon', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should validate a coupon', () => {
    // This is a placeholder - in a real test you would use a valid coupon code
    const couponCode = "TESTCOUPON";
    
    const validateCouponQuery = `
      {
        validateUserOnCoupon(input: {
          code: "${couponCode}"
        }) {
          status
          message
          coupon {
            id
            code
            discount
            discount_type
            start_date
            end_date
            is_active
            used
            max_use
          }
          discount_amount
          order_after_discount
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: validateCouponQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check coupon validation response structure
      if (response.body.data && response.body.data.validateUserOnCoupon) {
        expect(response.body.data.validateUserOnCoupon).to.have.property('status');
        expect(response.body.data.validateUserOnCoupon).to.have.property('message');
      }
    });
  });
});
