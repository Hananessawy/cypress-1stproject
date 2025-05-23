#!/usr/bin/env zsh
# filepath: /Users/hazem.n/Repos/tmp/cypress-1stproject/run_graphql_tests.sh

echo "Running GraphQL API Tests"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  pnpm install
fi

# Specify which tests to run - using the new organized structure
echo "Running all GraphQL tests using the organized structure..."
pnpm cypress:run --spec "cypress/e2e/graphql/**/*.cy.js"

# You can also run specific categories of GraphQL tests
echo "Running GraphQL Query tests..."
pnpm cypress:run --spec "cypress/e2e/graphql/queries/*.cy.js"

echo "Running GraphQL Mutation tests..."
pnpm cypress:run --spec "cypress/e2e/graphql/mutations/*.cy.js"

# If you want to run the original test files
echo "Running original GraphQL test files..."
pnpm cypress:run --spec "cypress/e2e/*_operations.cy.js"

# Run specific test categories by commenting/uncommenting as needed
# User Operations
# pnpm cypress:run --spec "cypress/e2e/graphql/queries/me.cy.js,cypress/e2e/graphql/mutations/login.cy.js,cypress/e2e/graphql/mutations/register.cy.js"

# Order Operations
# pnpm cypress:run --spec "cypress/e2e/graphql/queries/order.cy.js,cypress/e2e/graphql/queries/orders.cy.js,cypress/e2e/graphql/mutations/createOrder.cy.js"

# Brand & Branch Operations
# pnpm cypress:run --spec "cypress/e2e/graphql/queries/branches.cy.js,cypress/e2e/graphql/queries/getBrandsByGovernorate.cy.js"

# Wallet & Payment Operations
# pnpm cypress:run --spec "cypress/e2e/graphql/queries/cards.cy.js,cypress/e2e/graphql/queries/meWallet.cy.js,cypress/e2e/graphql/mutations/chargeWallet.cy.js"

echo "All tests completed!"
