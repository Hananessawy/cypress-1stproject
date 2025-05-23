# Cypress Test Project

This project contains automated tests for the Salahub login form using Cypress.

## Project Structure

```
├── .github/
│   └── workflows/
│       └── cypress-tests.yml   # GitHub Actions workflow configuration
├── cypress/
│   ├── e2e/
│   │   └── form_interaction.cy.js  # Test file
│   └── videos/                # Test recordings (generated during test runs)
├── cypress.config.js          # Cypress configuration
└── package.json               # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm package manager

### Installation

```bash
pnpm install
```

### Running Tests

To run tests in headless mode:

```bash
pnpm cypress:run
```

To open the Cypress Test Runner:

```bash
pnpm cypress:open
```

## CI/CD Integration

This project is configured with GitHub Actions to run Cypress tests automatically on:
- Every push to main/master branch
- Every pull request to main/master branch

The workflow configuration is in `.github/workflows/cypress-tests.yml`.

### CI Workflow Features

- Runs tests in headless mode
- Uses pnpm for dependency management
- Caches dependencies for faster runs
- Uploads test videos as artifacts (available for 7 days)

## Test Features

- Video recording enabled
- Tests form interactions on login page
- GraphQL API testing capabilities

## GraphQL Testing

This project includes support for testing GraphQL APIs through:

1. **GraphiQL Interface Testing**: Tests that interact with the GraphiQL web interface
2. **Direct API Testing**: Tests that make POST requests directly to the GraphQL endpoint

### GraphQL Test Files

- `graphql_queries.cy.js` - Basic GraphQL query tests
- `graphql_schema_explorer.cy.js` - Schema exploration and documentation tests
- `graphql_api_tests.cy.js` - Direct API testing without UI

### Custom Cypress Commands

The project includes custom commands for GraphQL testing:

- `cy.executeGraphQL()` - Execute a GraphQL query directly against the API
- `cy.visitGraphiQL()` - Visit the GraphiQL interface and optionally run a query

### Running GraphQL Tests

You can run different groups of GraphQL tests using these commands:

```bash
# Run all organized GraphQL tests (both queries and mutations)
pnpm cypress:run --spec "cypress/e2e/graphql/**/*.cy.js"

# Run only GraphQL query tests
pnpm cypress:run --spec "cypress/e2e/graphql/queries/*.cy.js"

# Run only GraphQL mutation tests
pnpm cypress:run --spec "cypress/e2e/graphql/mutations/*.cy.js"

# Run the original test files
pnpm cypress:run --spec "cypress/e2e/*_operations.cy.js"

# Run a specific test category (e.g. all User-related tests)
pnpm cypress:run --spec "cypress/e2e/graphql/queries/me.cy.js,cypress/e2e/graphql/mutations/login.cy.js,cypress/e2e/graphql/mutations/register.cy.js"
```

You can also use the provided shell script which includes multiple test commands:

```bash
# Make the script executable (if needed)
chmod +x ./run_graphql_tests.sh

# Run all GraphQL tests using the script
./run_graphql_tests.sh
```

#### GraphQL Test Files

We've organized our GraphQL tests into a structured format that separates queries and mutations:

```
cypress/e2e/graphql/
├── queries/                   # GraphQL query tests
│   ├── me.cy.js               # User profile query test
│   ├── branches.cy.js         # Branch queries
│   ├── cards.cy.js            # Payment cards queries
│   └── ... (other query tests)
└── mutations/                 # GraphQL mutation tests
    ├── login.cy.js            # Login mutation test
    ├── register.cy.js         # Registration mutation test
    ├── createOrder.cy.js      # Order creation mutation
    └── ... (other mutation tests)
```

#### Test Files By Category

1. **User Operations**
   - Queries: `me.cy.js`
   - Mutations: `login.cy.js`, `register.cy.js`, `updateProfile.cy.js`, `checkEmailExist.cy.js`

2. **Order Operations**
   - Queries: `order.cy.js`, `orders.cy.js`
   - Mutations: `createOrder.cy.js`, `cancelOrder.cy.js`, `rescheduleOrder.cy.js`

3. **Brand & Branch Operations**
   - Queries: `branches.cy.js`, `getBrandsByGovernorate.cy.js`, `getGovernorateByBrand.cy.js`, `getBookingSettingsByBrand.cy.js`, `getTimeSlotByDate.cy.js`

4. **Wallet & Payment Operations**
   - Queries: `meWallet.cy.js`, `walletTransactions.cy.js`, `paymentMethods.cy.js`, `cards.cy.js`
   - Mutations: `chargeWallet.cy.js`, `generateSDKToken.cy.js`

5. **Coupon & Loyalty Operations**
   - Queries: `userCoupons.cy.js`, `validateUserOnCoupon.cy.js`, `loyaltyRules.cy.js`, `salaCreditRules.cy.js`, `coupons.cy.js`, `offers.cy.js`

6. **Social & Friend Operations**
   - Queries: `friends.cy.js`, `searchMember.cy.js`, `notifications.cy.js`
   - Mutations: `addFriend.cy.js`, `removeFriend.cy.js`, `changeInvitationStatus.cy.js`, `readNotification.cy.js`

The original test files are still available for reference:
1. `user_operations.cy.js`
2. `order_operations.cy.js` 
3. `brand_branch_operations.cy.js`
4. `wallet_payment_operations.cy.js`
5. `coupon_loyalty_operations.cy.js`
6. `social_friend_operations.cy.js`
