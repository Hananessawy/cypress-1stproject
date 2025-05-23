// Test file for loyaltyRules query
describe('GraphQL Loyalty Query: loyaltyRules', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
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
});
