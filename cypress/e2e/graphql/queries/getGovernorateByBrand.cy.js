describe('getGovernorateByBrand Query', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should query governorates by brand', () => {
    // This is a placeholder ID - in a real test you would use an actual brand ID
    const brandId = "1"; 
    
    const governoratesByBrandQuery = `
      {
        getGovernorateByBrand(input: {
          brand_id: "${brandId}"
        }) {
          status
          message
          governorates {
            id
            name
            name_ar
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: governoratesByBrandQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check governorates response structure
      if (response.body.data && response.body.data.getGovernorateByBrand) {
        expect(response.body.data.getGovernorateByBrand).to.have.property('status');
        expect(response.body.data.getGovernorateByBrand).to.have.property('message');
        
        if (response.body.data.getGovernorateByBrand.governorates) {
          const governorates = response.body.data.getGovernorateByBrand.governorates;
          if (governorates.length > 0) {
            expect(governorates[0]).to.have.property('id');
            expect(governorates[0]).to.have.property('name');
            expect(governorates[0]).to.have.property('name_ar');
          }
        }
      }
    });
  });
});
