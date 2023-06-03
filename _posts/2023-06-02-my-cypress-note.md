---
title: My Cypress note
date: 2023-06-02
tags:
  - cypress
---

### Lint error

```javascript
cy.visit('/dashboard');

// When
cy.location().should((loc) => {
  // Then
  expect(loc.pathname).to.eq('/login');
});
```

ESLint may flag `cy.visit()` as error as it can’t find the definition. Add `plugin:cypress/recommended` to `.eslintrc.js`

```javascript
module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended', 'plugin:cypress/recommended'],
  env: {
    browser: true,
    node: true,
```

### Config.js

Cypress 12 has quite a few breaking changes and [this migration guide](https://docs.cypress.io/guides/references/migration-guide) comes very handy. One of the changes is using `config.js` instead of `config.json`. 

```javascript
const { defineConfig } = require('cypress');
const { username, password, tokenApiUrl } = require('./cypress.plain.json');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://xcp.next.test.stacks.xenzonegroup.com',
  },
  env: {
    username: username,
    password: password,
    tokenApiUrl: tokenApiUrl,
  },
});
```

### Using support

```javascript
const _ = Cypress._;
const url = require('url');
const { username, password, tokenApiUrl } = Cypress.env();

describe('The dashboard', () => {
  describe('when a worker is not logged in', () => {
    it('should redirect to the login page', () => {
      // Given
      cy.visit('/dashboard');

      // When
      cy.location().should((loc) => {
        // Then
        expect(loc.pathname).to.eq('/login');
      });
    });
  });

  describe('when a worker is logged in', () => {
    it('should be possible to visit the dashboard', () => {
      // Given
      cy.login();

      // When
      cy.visit('/dashboard/schedule');

      // Then
      cy.get('[data-test-id="dashboard"]').should('have.attr', 'data-test-id', 'dashboard');
    });
  });
});
```

```javascript
// cypress/support/e2e.js
import './login';
```

```javascript
const { username, password, tokenApiUrl } = Cypress.env();

if (!username || !password)
  throw new Error(
    'Looks like there is no username or password Cypress env variables. Make sure you have cypress.env.json configured correctly! See README - One time setup: environment variables'
  );

Cypress.Commands.add('login', (overrides = {}) => {
  Cypress.log({
    name: 'login',
  });

  cy.request({
    method: 'POST',
    url: 'https://auth.com/token',
    form: true,
    body: {
      username: username,
      password: password,
      grant_type: 'password',
      scope: 'type:user',
    },
  }).then((resp) => {
    cy.setCookie(
      'auth',
      JSON.stringify({
        accessToken: resp.body.access_token,
        token_type: 'Bearer',
        expiresAt: Date.now() + resp.body.expires_in * 1000,
      })
    );
  });
});
```

