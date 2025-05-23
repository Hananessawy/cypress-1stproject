// Test file for userCoupons query
describe('GraphQL Coupon Query: userCoupons', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should query user coupons', () => {
    const userCouponsQuery = `
      {
        userCoupons(input: {}) {
          status
          message
          coupons {
            id
            code
            discount
            discount_type
            start_date
            end_date
            is_active
            used
            max_use
            description
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: userCouponsQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check user coupons response structure
      if (response.body.data && response.body.data.userCoupons) {
        expect(response.body.data.userCoupons).to.have.property('status');
        expect(response.body.data.userCoupons).to.have.property('message');
        
        if (response.body.data.userCoupons.coupons) {
          expect(response.body.data.userCoupons.coupons).to.be.an('array');
          
          if (response.body.data.userCoupons.coupons.length > 0) {
            const coupon = response.body.data.userCoupons.coupons[0];
            expect(coupon).to.have.property('id');
            expect(coupon).to.have.property('code');
            expect(coupon).to.have.property('discount');
            expect(coupon).to.have.property('discount_type');
          }
        }
      }
    });
  });
});
