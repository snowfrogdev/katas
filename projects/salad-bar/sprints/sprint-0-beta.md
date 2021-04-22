# Sprint 0

This is the current beta version for the app. This information is here for reference, to help you get started and give you a better understanding of the general requirements for the app.

## Requirements

- The salad ordering process is a multi-step process. When navigating to the app for a new order users will be directed to the first step in the process.
- Each step offers the user the ability to choose one option from a list of ingredients.
- At each step screen, there should be a button labelled 'Next' to move to the next step.
- To help the user see his progress, a stepper component is displayed at all times. The current and previous steps are differentiated visually from steps not yet completed.
- Each step has its own route.
- User choices are persisted so that the user can leave, come back later, and continue the process where they left off.
- Users should not be able to skip steps or move to the next step without selecting an ingredient for the current step.
- The last step in the process should show a summary of the salad order and should have a button labeled 'Confirm' to allow the user to confirm the order.
- Once the order has been confirmed, a message should be displayed on screen making this obvious and the process should be reset.

## Steps and choices

| 1 - Lettuce | 2 - Veggies | 3 - Toppings  | 4 - Salad |
|-------------|-------------|---------------|-----------|
| Romaine     | Cucumber    | Toasted Seeds |           |
| Boston      | Tomatoes    | Pine Nuts     |           |
| Iceberg     | Carrots     | Croutons      |           |
