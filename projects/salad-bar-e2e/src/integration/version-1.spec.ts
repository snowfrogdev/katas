import { StepperTestHelper } from '../helpers/stepper-test-helper';

describe('Version 1', () => {
  let steps: Step[];
  let stepper: StepperTestHelper;

  beforeEach(() => {
    steps = [
      { name: 'Lettuce', options: ['Romaine', 'Boston', 'Iceberg'] },
      { name: 'Veggies', options: ['Cucumber', 'Tomatoes', 'Carrots'] },
      { name: 'Toppings', options: ['Toasted Seeds', 'Pine Nuts', 'Croutons'] },
    ];
    stepper = new StepperTestHelper([...steps.map((step) => step.name), 'Salad']);
  });
  it('Happy path', () => {
    const choices: Choices[] = [];

    cy.visit('/');

    for (let i = 0; i < steps.length; i++) {
      const step: Step = steps[i];

      cy.url().should('include', `/${step.name.toLowerCase()}`);
      stepper.test(i);

      cy.get('input').should('not.have.property', 'checked');
      cy.contains('button', 'Next').should('be.disabled');

      choices.push({ category: step.name, name: step.options[0] });
      cy.contains('label', step.options[0], { matchCase: false }).click();
      cy.contains('button', 'Next').click();
    }

    cy.url().should('include', '/salad');
    const indexOfFinalStep = steps.length;
    stepper.test(indexOfFinalStep);

    for (const choice of choices) {
      cy.contains(`${choice.category}: ${choice.name}`, { matchCase: false });
    }

    cy.contains('button', 'Confirm').click();
    cy.contains('Order Confirmed', { matchCase: false });
  });

  it('Persists choices so that the user can pick up where he left off', () => {
    const choices: Choices[] = [];

    for (let i = 0; i < steps.length; i++) {
      const step: Step = steps[i];

      cy.visit(`/${step.name.toLowerCase()}`);
      cy.url().should('include', `/${step.name.toLowerCase()}`);
      stepper.test(i);

      choices.push({ category: step.name, name: step.options[1] });
      cy.contains('label', step.options[1], { matchCase: false }).click();
      cy.contains('button', 'Next').click();
    }

    cy.url().should('include', '/salad');
    const indexOfFinalStep = steps.length;
    stepper.test(indexOfFinalStep);

    for (const choice of choices) {
      cy.contains(`${choice.category}: ${choice.name}`, { matchCase: false });
    }

    cy.contains('button', 'Confirm').click();
    cy.contains('Order Confirmed', { matchCase: false });
  });

  it('Prevents users from skipping steps by navigating', () => {
    const choices: Choices[] = [];

    for (let i = 0; i < steps.length; i++) {
      const step: Step = steps[i];

      cy.visit(`/salad`);
      cy.url().should('include', `/${step.name.toLowerCase()}`);
      stepper.test(i);

      choices.push({ category: step.name, name: step.options[1] });
      cy.contains('label', step.options[1], { matchCase: false }).click();
      cy.contains('button', 'Next').click();
    }

    cy.url().should('include', '/salad');
    const indexOfFinalStep = steps.length;
    stepper.test(indexOfFinalStep);

    for (const choice of choices) {
      cy.contains(`${choice.category}: ${choice.name}`, { matchCase: false });
    }

    cy.contains('button', 'Confirm').click();
    cy.contains('Order Confirmed', { matchCase: false });
  });
});

interface Step {
  name: string;
  options: string[];
}

interface Choices {
  category: string;
  name: string;
}
