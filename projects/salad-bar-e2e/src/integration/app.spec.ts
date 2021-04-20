describe('salad', () => {
  it('happy path', () => {
    cy.visit('/');

    cy.url().should('include', '/lettuce');

    const stepper = new Stepper(['Lettuce', 'Veggies', 'Toppings', 'Salad']);
    stepper.shouldBeOnStepIndex(0);

    cy.get('input').should('not.have.property', 'checked');
    cy.contains('button', 'Next').should('be.disabled');

    cy.contains('label', 'Romaine').click();
    cy.contains('button', 'Next').click();

    cy.url().should('include', '/veggies');
    stepper.shouldBeOnStepIndex(1);

    cy.get('input').should('not.have.property', 'checked');
    cy.contains('button', 'Next').should('be.disabled');

    cy.contains('label', 'Tomatoes').click();
    cy.contains('button', 'Next').click();

    cy.url().should('include', '/toppings');
    stepper.shouldBeOnStepIndex(2);

    cy.get('input').should('not.have.property', 'checked');
    cy.contains('button', 'Next').should('be.disabled');

    cy.contains('label', 'Croutons').click();
    cy.contains('button', 'Next').click();

    cy.url().should('include', '/salad');
    stepper.shouldBeOnStepIndex(3);

    cy.contains('Lettuce: romaine');
    cy.contains('Veggies: tomatoes');
    cy.contains('Toppings: croutons');
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

class Stepper {
  constructor(private stepNames: string[]) {}

  shouldBeOnStepIndex(stepIndex: number): void {
    cy.get('.stepper')
      .children('li')
      .then((items) => {
        for (let i = 0; i < items.length; i++) {
          switch (true) {
            case i < stepIndex:
              expect(items[i])
                .to.contain.text(this.stepNames[i])
                .and.to.contain.text((i + 1).toString())
                .and.to.have.class('completed');
              break;

            case i === stepIndex:
              expect(items[i])
                .to.contain.text(this.stepNames[i])
                .and.to.contain.text((i + 1).toString())
                .and.to.have.class('active');
              break;

            case i > stepIndex:
              expect(items[i])
                .to.contain.text(this.stepNames[i])
                .and.to.contain.text((i + 1).toString())
                .and.to.not.have.class('active')
                .and.to.not.have.class('completed');
          }
        }
      });
  }
}
