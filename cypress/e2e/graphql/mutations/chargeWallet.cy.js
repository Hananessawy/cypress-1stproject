// Test file for chargeWallet mutation
describe('GraphQL Wallet Mutation: chargeWallet', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should test charge wallet mutation', () => {
    // This is a placeholder - in a real test you would use valid parameters
    const chargeWalletMutation = `
      mutation {
        chargeWallet(input: {
          amount: 100
          payment_method: "CARD"
        }) {
          status
          message
          payment_url
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: chargeWalletMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check charge wallet response structure
      if (response.body.data && response.body.data.chargeWallet) {
        expect(response.body.data.chargeWallet).to.have.property('status');
        expect(response.body.data.chargeWallet).to.have.property('message');
      }
    });
  });
});
