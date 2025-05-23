// Test file for offers query
describe('GraphQL Offer Query: offers', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
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
