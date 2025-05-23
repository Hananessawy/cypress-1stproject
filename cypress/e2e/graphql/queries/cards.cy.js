// Test file for cards query
describe('GraphQL Payment Query: cards', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
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
