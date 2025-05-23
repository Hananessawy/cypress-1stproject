// Test file for walletTransactions query
describe('GraphQL Wallet Query: walletTransactions', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should query wallet transactions with pagination', () => {
    const walletTransactionsQuery = `
      {
        walletTransactions(first: 10) {
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
            firstItem
            lastItem
            hasMorePages
            lastPage
            perPage
            total
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: walletTransactionsQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check wallet transactions response structure
      if (response.body.data && response.body.data.walletTransactions) {
        expect(response.body.data.walletTransactions).to.have.property('data');
        expect(response.body.data.walletTransactions).to.have.property('paginatorInfo');
        
        if (response.body.data.walletTransactions.data.length > 0) {
          const transaction = response.body.data.walletTransactions.data[0];
          expect(transaction).to.have.property('id');
          expect(transaction).to.have.property('amount');
          expect(transaction).to.have.property('type');
          expect(transaction).to.have.property('description');
        }
      }
    });
  });
});
