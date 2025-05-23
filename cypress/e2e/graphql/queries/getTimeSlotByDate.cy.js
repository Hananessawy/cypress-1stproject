describe('getTimeSlotByDate Query', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
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
});
