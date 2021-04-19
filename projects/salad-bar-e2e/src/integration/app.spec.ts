describe('salad', () => {
  it('happy path', () => {
    cy.visit('/');
    cy.url().should('include', '/lettuce');
    cy.contains('li', 'Lettuce').should('have.class', 'active');
    cy.contains('Romaine').click();
    cy.contains('button', 'Next').click();

    cy.url().should('include', '/veggies');
    cy.contains('li', 'Lettuce').should('have.class', 'completed');
    cy.contains('li', 'Veggies').should('have.class', 'active');
    cy.contains('Tomatoes').click();
    cy.contains('button', 'Next').click();

    cy.url().should('include', '/toppings');
    cy.contains('li', 'Lettuce').should('have.class', 'completed');
    cy.contains('li', 'Veggies').should('have.class', 'completed');
    cy.contains('li', 'Toppings').should('have.class', 'active');
    cy.contains('Croutons').click();
    cy.contains('button', 'Next').click();

    cy.url().should('include', '/salad');
    cy.contains('li', 'Lettuce').should('have.class', 'completed');
    cy.contains('li', 'Veggies').should('have.class', 'completed');
    cy.contains('li', 'Toppings').should('have.class', 'completed');
    cy.contains('li', 'Salad').should('have.class', 'active');
    cy.contains('Lettuce: romaine');
    cy.contains('Veggies: tomatoes');
    cy.contains('Toppings: croutons');
  });

  it('For each step, no items should be selected by default and the "Next" button should be disabled', () => {
    cy.visit('/');
    function runTest() {
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Next")').length) {
          cy.get('input').should('not.have.property', 'checked');
          cy.contains('button', 'Next').should('be.disabled');

          cy.get('input').first().check({ force: true });
          cy.contains('button', 'Next').click().then(runTest);
        }
      });
    }

    runTest();
  });

  it('Persists choices so that the user can pick up where he left off', () => {
    cy.visit('/lettuce');
    cy.contains('Boston').click();
    cy.contains('button', 'Next').click();

    cy.visit('/veggies');
    cy.contains('Cucumber').click();
    cy.contains('button', 'Next').click();

    cy.visit('/toppings');
    cy.contains('Pine Nuts').click();
    cy.contains('button', 'Next').click();

    cy.visit('/salad');
    cy.contains('Lettuce: boston');
    cy.contains('Veggies: cucumber');
    cy.contains('Toppings: pine nuts');
  });
});
