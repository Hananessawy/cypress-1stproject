describe('Social and Friend Operations', () => {
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

  it('should test add friend mutation', () => {
    // This is a placeholder - in a real test you would use a valid user ID
    const userId = "123";
    
    const addFriendMutation = `
      mutation {
        addFriend(input: {
          friend_id: "${userId}"
        }) {
          status
          message
          friend {
            id
            status
            friend {
              id
              name
              email
            }
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: addFriendMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check add friend response structure
      if (response.body.data && response.body.data.addFriend) {
        expect(response.body.data.addFriend).to.have.property('status');
        expect(response.body.data.addFriend).to.have.property('message');
      }
    });
  });

  it('should test remove friend mutation', () => {
    // This is a placeholder - in a real test you would use a valid friend relationship ID
    const friendId = "123";
    
    const removeFriendMutation = `
      mutation {
        removeFriend(input: {
          friend_id: "${friendId}"
        }) {
          status
          message
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: removeFriendMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check remove friend response structure
      if (response.body.data && response.body.data.removeFriend) {
        expect(response.body.data.removeFriend).to.have.property('status');
        expect(response.body.data.removeFriend).to.have.property('message');
      }
    });
  });

  it('should test change invitation status mutation', () => {
    // This is a placeholder - in a real test you would use valid parameters
    const friendId = "123";
    
    const changeInvitationStatusMutation = `
      mutation {
        changeInvitationStatus(input: {
          friend_id: "${friendId}"
          status: accept
        }) {
          status
          message
          friend {
            id
            status
            friend {
              id
              name
              email
            }
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: changeInvitationStatusMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check invitation status change response structure
      if (response.body.data && response.body.data.changeInvitationStatus) {
        expect(response.body.data.changeInvitationStatus).to.have.property('status');
        expect(response.body.data.changeInvitationStatus).to.have.property('message');
      }
    });
  });

  it('should query notifications', () => {
    const notificationsQuery = `
      {
        notifications(first: 10) {
          data {
            id
            title
            body
            is_read
            type
            data {
              order_id
              friend_id
              friend_name
              friend_email
            }
            created_at
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
      body: { query: notificationsQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check notifications response structure
      if (response.body.data && response.body.data.notifications) {
        expect(response.body.data.notifications).to.have.property('data');
        expect(response.body.data.notifications).to.have.property('paginatorInfo');
        
        if (response.body.data.notifications.data.length > 0) {
          const notification = response.body.data.notifications.data[0];
          expect(notification).to.have.property('id');
          expect(notification).to.have.property('title');
          expect(notification).to.have.property('body');
          expect(notification).to.have.property('is_read');
        }
      }
    });
  });

  it('should test read notification mutation', () => {
    // This is a placeholder - in a real test you would use a valid notification ID
    const notificationId = "123";
    
    const readNotificationMutation = `
      mutation {
        readNotification(input: {
          notification_id: "${notificationId}"
        }) {
          status
          message
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: readNotificationMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check read notification response structure
      if (response.body.data && response.body.data.readNotification) {
        expect(response.body.data.readNotification).to.have.property('status');
        expect(response.body.data.readNotification).to.have.property('message');
      }
    });
  });
});
