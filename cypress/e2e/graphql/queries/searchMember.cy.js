// Test file for searchMember query
describe('GraphQL Social Query: searchMember', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should test search members query', () => {
    // This is a placeholder - in a real test you would use a valid search term
    const searchTerm = "test";
    
    const searchMembersQuery = `
      {
        searchMember(input: {
          search: "${searchTerm}"
          type: all
        }) {
          status
          message
          users {
            id
            name
            email
            mobile
            is_friend
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: searchMembersQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check search members response structure
      if (response.body.data && response.body.data.searchMember) {
        expect(response.body.data.searchMember).to.have.property('status');
        expect(response.body.data.searchMember).to.have.property('message');
        
        if (response.body.data.searchMember.users) {
          expect(response.body.data.searchMember.users).to.be.an('array');
        }
      }
    });
  });
});
