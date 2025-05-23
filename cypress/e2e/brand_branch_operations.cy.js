describe('Brand and Branch Operations', () => {
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

  it('should query time slots by date for a branch', () => {
    // These are placeholder IDs - in a real test you would use actual IDs
    const branchId = "1";
    const date = "2025-06-01";
    
    const timeSlotsQuery = `
      {
        getTimeSlotByDate(input: {
          branch_id: "${branchId}"
          date: "${date}"
        }) {
          status
          message
          time_slots {
            id
            start_time
            end_time
            capacity
            available_slots
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: timeSlotsQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check time slots response structure
      if (response.body.data && response.body.data.getTimeSlotByDate) {
        expect(response.body.data.getTimeSlotByDate).to.have.property('status');
        expect(response.body.data.getTimeSlotByDate).to.have.property('message');
        
        if (response.body.data.getTimeSlotByDate.time_slots) {
          expect(response.body.data.getTimeSlotByDate.time_slots).to.be.an('array');
          if (response.body.data.getTimeSlotByDate.time_slots.length > 0) {
            const timeSlot = response.body.data.getTimeSlotByDate.time_slots[0];
            expect(timeSlot).to.have.property('id');
            expect(timeSlot).to.have.property('start_time');
            expect(timeSlot).to.have.property('end_time');
            expect(timeSlot).to.have.property('capacity');
            expect(timeSlot).to.have.property('available_slots');
          }
        }
      }
    });
  });

  it('should query available branches with working hours', () => {
    const branchesQuery = `
      {
        branches {
          id
          name
          name_ar
          address
          is_active
          latitude
          longitude
          work_hours {
            id
            day
            start_time
            end_time
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: branchesQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check branches response structure
      if (response.body.data && response.body.data.branches) {
        expect(response.body.data.branches).to.be.an('array');
        
        if (response.body.data.branches.length > 0) {
          const branch = response.body.data.branches[0];
          expect(branch).to.have.property('id');
          expect(branch).to.have.property('name');
          expect(branch).to.have.property('address');
          
          if (branch.work_hours) {
            expect(branch.work_hours).to.be.an('array');
          }
        }
      }
    });
  });
});
