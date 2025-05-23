// Test file for coupons query
describe('GraphQL Coupon Query: coupons', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should query all available coupons', () => {
    const couponsQuery = `
      {
        coupons {
          data {
            id
            code
            discount
            discount_type
            start_date
            end_date
            is_active
            max_use
            description
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
      body: { query: couponsQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check coupons response structure
      if (response.body.data && response.body.data.coupons) {
        expect(response.body.data.coupons).to.have.property('data');
        expect(response.body.data.coupons).to.have.property('paginatorInfo');
        
        if (response.body.data.coupons.data.length > 0) {
          const coupon = response.body.data.coupons.data[0];
          expect(coupon).to.have.property('id');
          expect(coupon).to.have.property('code');
          expect(coupon).to.have.property('discount');
        }
      }
    });
  });
});
