import { StepperTestHelper } from '../helpers/stepper-test-helper';

describe('Version 0 beta', () => {
  let steps: Step[];
  let stepper: StepperTestHelper;

  beforeEach(() => {
    steps = [
      { name: 'Lettuce', options: ['Romaine', 'Boston', 'Iceberg', 'Green Leaf'] },
      { name: 'Cheese', options: ['Parmesan', 'Mozzarella', 'Feta'] },
      { name: 'Veggies', options: ['Cucumber', 'Tomatoes', 'Carrots', 'Celery'] },
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

      for (const option of step.options) {
        cy.contains('label', option, { matchCase: false });
      }

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

    cy.contains('button', 'Confirm').should('not.exist');
    cy.contains('button', 'Previous').should('not.exist');
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

  it('Navigates backwards in the process when hitting the Previous button', () => {
    const choices: Choices[] = [];

    cy.visit('/');

    for (let i = 0; i < steps.length; i++) {
      const step: Step = steps[i];

      cy.url().should('include', `/${step.name.toLowerCase()}`);

      choices.push({ category: step.name, name: step.options[0] });
      cy.contains('label', step.options[2], { matchCase: false }).click();
      cy.contains('button', 'Next').click();
    }

    cy.url().should('include', '/salad');
    cy.contains('button', 'Previous').click();

    for (let i = steps.length - 1; i > 0; i--) {
      const step: Step = steps[i];

      cy.url().should('include', `/${step.name.toLowerCase()}`);
      cy.contains('button', 'Previous').click();
    }

    cy.url().should('include', `/${steps[0].name.toLowerCase()}`);
    cy.contains('button', 'Previous').should('not.exist');
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
