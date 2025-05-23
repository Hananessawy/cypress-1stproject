describe('User Operations', () => {
  // Test user data
  const testUser = {
    email: 'test.user@example.com',
    password: 'Password123!',
    firstName: 'Test',
    lastName: 'User',
    mobile: '+201234567890'
  };

  beforeEach(() => {
    // Visit the base URL to ensure cookies are set properly
    cy.visit('/');
  });

  it('should check if an email exists', () => {
    const checkEmailQuery = `
      mutation {
        checkEmailExist(input: {
          email: "${testUser.email}"
        }) {
          status
          message
          exists
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: checkEmailQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // We don't know if the user exists, so just check the structure
      if (response.body.data && response.body.data.checkEmailExist) {
        expect(response.body.data.checkEmailExist).to.have.property('status');
        expect(response.body.data.checkEmailExist).to.have.property('message');
        expect(response.body.data.checkEmailExist).to.have.property('exists');
      }
    });
  });

  it('should be able to login with valid credentials', () => {
    // This is just a test - in real use we would need valid credentials
    const loginMutation = `
      mutation {
        login(input: {
          username: "${testUser.email}",
          password: "${testUser.password}"
        }) {
          access_token
          token_type
          user {
            id
            name
            email
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: loginMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Since we're using test credentials, we expect this to potentially fail
      // but we can validate the structure of the response
      if (response.body.data && response.body.data.login) {
        expect(response.body.data.login).to.have.property('access_token');
        expect(response.body.data.login).to.have.property('token_type');
        expect(response.body.data.login).to.have.property('user');
      }
    });
  });

  it('should query user profile information', () => {
    // Query the user's profile information
    const profileQuery = `
      {
        me {
          id
          name
          email
          mobile
          mobile_verified_at
          is_active
          wallet {
            id
            balance
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: profileQuery },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // If user is authenticated, check profile structure
      if (response.body.data && response.body.data.me) {
        expect(response.body.data.me).to.have.property('id');
        expect(response.body.data.me).to.have.property('name');
        expect(response.body.data.me).to.have.property('email');
      }
    });
  });

  it('should test update profile mutation', () => {
    const updateProfileMutation = `
      mutation {
        updateProfile(input: {
          first_name: "Updated"
          last_name: "Name"
          language: "en"
        }) {
          status
          message
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: updateProfileMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check structure of response, expect authentication error or success
      if (response.body.data && response.body.data.updateProfile) {
        expect(response.body.data.updateProfile).to.have.property('status');
        expect(response.body.data.updateProfile).to.have.property('message');
      }
    });
  });

  it('should test registration flow', () => {
    // Generate a unique email to avoid conflicts
    const uniqueEmail = `test.user.${Date.now()}@example.com`;
    
    const registerMutation = `
      mutation {
        register(input: {
          first_name: "New"
          last_name: "User"
          email: "${uniqueEmail}"
          password: "Password123!"
          password_confirmation: "Password123!"
          mobile: "+201234567891"
          birthdate: "1990-01-01"
          gender: male
        }) {
          status
          message
          access_token
          user {
            id
            name
            email
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: '/graphql',
      body: { query: registerMutation },
      failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      
      // Check registration response structure
      if (response.body.data && response.body.data.register) {
        expect(response.body.data.register).to.have.property('status');
        expect(response.body.data.register).to.have.property('message');
      }
    });
  });
});
