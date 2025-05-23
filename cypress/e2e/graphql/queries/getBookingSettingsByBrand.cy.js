describe('getBookingSettingsByBrand Query', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should query booking settings by brand', () => {
    // This is a placeholder ID - in a real test you would use an actual brand ID
    const brandId = "1";
    
    const bookingSettingsQuery = `
      {
        getBookingSettingsByBrand(input: {
          brand_id: "${brandId}"
        }) {
          status
          message
          booking_steps {
            id
            name
            name_ar
            order
          }
          categories {
            id
            name
            name_ar
            tickets {
              id
              name
              name_ar
              unit_price
              extra_info {
                id
                name
                name_ar
                type
                is_required
                options
              }
            }
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: bookingSettingsQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check booking settings response structure
      if (response.body.data && response.body.data.getBookingSettingsByBrand) {
        expect(response.body.data.getBookingSettingsByBrand).to.have.property('status');
        expect(response.body.data.getBookingSettingsByBrand).to.have.property('message');
        
        if (response.body.data.getBookingSettingsByBrand.booking_steps) {
          expect(response.body.data.getBookingSettingsByBrand.booking_steps).to.be.an('array');
        }
        
        if (response.body.data.getBookingSettingsByBrand.categories) {
          expect(response.body.data.getBookingSettingsByBrand.categories).to.be.an('array');
        }
      }
    });
  });
});
