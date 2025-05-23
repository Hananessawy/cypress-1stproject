describe('Wallet and Payment Operations', () => {
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

  it('should query saved payment cards', () => {
    const savedCardsQuery = `
      {
        cards {
          id
          card_number
          expiry_date
          name_on_card
          is_default
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: savedCardsQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check cards response structure
      if (response.body.data && response.body.data.cards) {
        expect(response.body.data.cards).to.be.an('array');
        
        if (response.body.data.cards.length > 0) {
          const card = response.body.data.cards[0];
          expect(card).to.have.property('id');
          expect(card).to.have.property('card_number');
          expect(card).to.have.property('expiry_date');
        }
      }
    });
  });
});
