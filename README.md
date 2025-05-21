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
