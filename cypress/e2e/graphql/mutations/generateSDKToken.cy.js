// Test file for generateSDKToken mutation
describe('GraphQL Payment Mutation: generateSDKToken', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should test generate SDK token mutation', () => {
    // This is a placeholder - in a real test you would use valid parameters
    const generateSDKTokenMutation = `
      mutation {
        generateSDKToken(input: {
          amount: "100"
          currency: "EGP"
        }) {
          status
          message
          token
          merchant_reference
          payfort {
            access_code
            merchant_identifier
            language
            device_fingerprint
            sdk_token
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: generateSDKTokenMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check SDK token response structure
      if (response.body.data && response.body.data.generateSDKToken) {
        expect(response.body.data.generateSDKToken).to.have.property('status');
        expect(response.body.data.generateSDKToken).to.have.property('message');
      }
    });
  });
});
