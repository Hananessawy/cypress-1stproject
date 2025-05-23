// Test file for salaCreditRules query
describe('GraphQL Credit Query: salaCreditRules', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
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
});
