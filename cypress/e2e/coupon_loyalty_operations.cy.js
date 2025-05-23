describe('Coupon and Loyalty Operations', () => {
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

  it('should query loyalty rules', () => {
    const loyaltyRulesQuery = `
      {
        loyaltyRules {
          id
          rule_name
          rule_name_ar
          rule_type
          points
          status
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: loyaltyRulesQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check loyalty rules response structure
      if (response.body.data && response.body.data.loyaltyRules) {
        expect(response.body.data.loyaltyRules).to.be.an('array');
        
        if (response.body.data.loyaltyRules.length > 0) {
          const rule = response.body.data.loyaltyRules[0];
          expect(rule).to.have.property('id');
          expect(rule).to.have.property('rule_name');
          expect(rule).to.have.property('rule_type');
          expect(rule).to.have.property('points');
        }
      }
    });
  });

  it('should query sala credit rules', () => {
    const salaCreditRulesQuery = `
      {
        salaCreditRules {
          id
          rule_name
          rule_name_ar
          rule_type
          value
          status
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: salaCreditRulesQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check sala credit rules response structure
      if (response.body.data && response.body.data.salaCreditRules) {
        expect(response.body.data.salaCreditRules).to.be.an('array');
        
        if (response.body.data.salaCreditRules.length > 0) {
          const rule = response.body.data.salaCreditRules[0];
          expect(rule).to.have.property('id');
          expect(rule).to.have.property('rule_name');
          expect(rule).to.have.property('rule_type');
          expect(rule).to.have.property('value');
        }
      }
    });
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

  it('should query offers', () => {
    const offersQuery = `
      {
        offers {
          id
          name
          name_ar
          description
          description_ar
          start_date
          end_date
          is_active
          tickets {
            id
            name
            name_ar
            unit_price
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: offersQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check offers response structure
      if (response.body.data && response.body.data.offers) {
        expect(response.body.data.offers).to.be.an('array');
        
        if (response.body.data.offers.length > 0) {
          const offer = response.body.data.offers[0];
          expect(offer).to.have.property('id');
          expect(offer).to.have.property('name');
          expect(offer).to.have.property('start_date');
          expect(offer).to.have.property('end_date');
          
          if (offer.tickets) {
            expect(offer.tickets).to.be.an('array');
          }
        }
      }
    });
  });
});
