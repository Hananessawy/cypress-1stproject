// Test file for paymentMethods query
describe('GraphQL Payment Query: paymentMethods', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should query payment methods', () => {
    const paymentMethodsQuery = `
      {
        paymentMethods {
          id
          name
          name_ar
          is_active
          type
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: paymentMethodsQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check payment methods response structure
      if (response.body.data && response.body.data.paymentMethods) {
        expect(response.body.data.paymentMethods).to.be.an('array');
        
        if (response.body.data.paymentMethods.length > 0) {
          const method = response.body.data.paymentMethods[0];
          expect(method).to.have.property('id');
          expect(method).to.have.property('name');
          expect(method).to.have.property('type');
        }
      }
    });
  });
});
