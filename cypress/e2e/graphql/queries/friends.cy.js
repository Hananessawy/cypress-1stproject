// Test file for friends query
describe('GraphQL Social Query: friends', () => {
  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should query user friends', () => {
    const friendsQuery = `
      {
        friends(first: 10, type: all) {
          data {
            id
            status
            created_at
            friend {
              id
              name
              email
              mobile
            }
          }
          paginatorInfo {
            count
            currentPage
            total
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: friendsQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check friends response structure
      if (response.body.data && response.body.data.friends) {
        expect(response.body.data.friends).to.have.property('data');
        expect(response.body.data.friends).to.have.property('paginatorInfo');
        
        if (response.body.data.friends.data.length > 0) {
          const friend = response.body.data.friends.data[0];
          expect(friend).to.have.property('id');
          expect(friend).to.have.property('status');
          expect(friend).to.have.property('friend');
          
          if (friend.friend) {
            expect(friend.friend).to.have.property('id');
            expect(friend.friend).to.have.property('name');
          }
        }
      }
    });
  });
});
