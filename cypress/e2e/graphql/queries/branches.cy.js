describe('branches Query', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
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
