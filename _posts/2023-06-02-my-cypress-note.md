---
title: My Cypress note
date: 2023-06-02
tags:
  - cypress
---

### Resource

- [Cypress Scenario Recorder](https://chrome.google.com/webstore/detail/cypress-scenario-recorder/fmpgoobcionmfneadjapdabmjfkmfekb/related?hl=en)

- [Cypress Network Requests](https://docs.cypress.io/guides/guides/network-requests)

- [Playground](https://docs.cypress.io/guides/core-concepts/cypress-app#Selector-Playground)

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

## Parameterised tests

You can use parameterized tests in Cypress, which is an excellent way to reduce code duplication when you need to run the same tests with different data.

Use **`[].forEach`** 

```javascript
[
    {
      fixture: 'general-notes.json',
      noteType: 'GeneralNote',
      noteContent: 'Note case note description',
    },
    {
      fixture: 'caseNotes/flagged-notes.json',
      noteType: 'FlaggedNote',
      noteContent: 'Flagged case note description',
    },
  ].forEach(({ fixture, noteType, noteContent }) => {
    it(`should be possible to add, save and then view a case note, of type "${noteType}"`, () => {
      cy.intercept('POST', '/users/**/notes', {
        fixture,
      });

      cy.visit(`/dashboard/users/${serviceUser}`);

      cy.get('[data-test-id="createButton"]').click();
      cy.get('h2').should('have.text', 'Add Case Note');

      cy.get(`input[value="${noteType}"]`).click();

      cy.get('textarea').should('have.attr', 'name', 'description').type(noteContent);

      cy.contains('SAVE').click();
      cy.wait(['@get-case-note']);

      cy.get('td').contains(noteContent).should('be.visible');
    });
  });
```

### Select a button that contains a text

```javascript
<button tabindex="0" 
	class="c1392 c1626 c1637 c1638 c1640 c1641" 
	type="button">
	<span class="c1627">Add incident</span>
	<span class="c1402"></span>
</button>

cy.get('button').contains('Add incident').click();
```

