describe('getBrandsByGovernorate Query', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should query brands by governorate', () => {
    // This is a placeholder ID - in a real test you would use an actual governorate ID
    const governorateId = "1"; 
    
    const brandsByGovernorateQuery = `
      {
        getBrandsByGovernorate(input: {
          governorate_id: "${governorateId}"
        }) {
          status
          message
          brands {
            id
            name
            name_ar
            logo
            brand_type
            rating
            branches {
              id
              name
              name_ar
              address
              is_active
              latitude
              longitude
            }
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: brandsByGovernorateQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check brands response structure
      if (response.body.data && response.body.data.getBrandsByGovernorate) {
        expect(response.body.data.getBrandsByGovernorate).to.have.property('status');
        expect(response.body.data.getBrandsByGovernorate).to.have.property('message');
        
        if (response.body.data.getBrandsByGovernorate.brands) {
          const brands = response.body.data.getBrandsByGovernorate.brands;
          if (brands.length > 0) {
            expect(brands[0]).to.have.property('id');
            expect(brands[0]).to.have.property('name');
            expect(brands[0]).to.have.property('logo');
          }
        }
      }
    });
  });
});
