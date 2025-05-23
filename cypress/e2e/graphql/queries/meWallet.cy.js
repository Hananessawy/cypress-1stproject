// Test file for me wallet query
describe('GraphQL User Wallet Query: meWallet', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should query user wallet information', () => {
    const walletQuery = `
      {
        me {
          id
          wallet {
            id
            balance
            transactions(first: 5) {
              data {
                id
                amount
                type
                description
                created_at
              }
              paginatorInfo {
                count
                currentPage
                total
              }
            }
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: walletQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check wallet response structure if user is authenticated
      if (response.body.data && response.body.data.me && response.body.data.me.wallet) {
        expect(response.body.data.me.wallet).to.have.property('id');
        expect(response.body.data.me.wallet).to.have.property('balance');
        
        if (response.body.data.me.wallet.transactions) {
          expect(response.body.data.me.wallet.transactions).to.have.property('data');
          expect(response.body.data.me.wallet.transactions).to.have.property('paginatorInfo');
        }
      }
    });
  });
});
