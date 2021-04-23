# Salad Bar Kata

Source: https://github.com/snowfrogdev/katas

## Background

This kata puts you in the role of an Angular developer having to work with someone else's code. The current code base does not always follow best practices. You'll be presented with new requirements to implement. You'll find that implementing each new requirement, without changing the current structure, requires changes to many components and files.

The idea is for you to refactor the code as you implement the new requirements. The objective is that with successive improvements, each new requirement should be easier to implement. If you do a really good job of refactoring, the last change request should only require you to modify one or two lines of code.

## Learning Objectives

This kata should offer the opportunity to learn the advantages of applying some or all of the following techniques:

- [Loose coupling](https://en.wikipedia.org/wiki/Loose_coupling)
- [Declarative programming](https://en.wikipedia.org/wiki/Declarative_programming)
- [Data-driven programming](https://en.wikipedia.org/wiki/Data-driven_programming)
- [Systems design](https://en.wikipedia.org/wiki/Systems_design)
- [Smart vs presentational components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/)
- [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)
- [Single Responsability Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)
- [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)
- [Don't repeat yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

## Instructions

Hi and welcome to team SlädBär - you know we're cool and high tech because we spell our name in a quirky way. We aim to disrupt the salad bar industry by providing a way for salad enthusiasts to order a custom made salad online and get it delivered to their location, anywhere in the world, in less than 30 minutes or it's free. That's our wilted-free guarantee.

Over the next few sprints, we are planning improvements to our multi-step salad ordering process and you will be responsible for implementing these changes. If you are reading this README file, you have discovered the source code for SlädBär, good job. We also have a suite of end-to-end tests contained in the [projects/salad-bar-e2e/integration](../salad-bar-e2e/integration) folder.

We encourage you to first get familiar with the app and the current requirements, before you move on to your first sprint.

### Prerequisites

Since you got hired at SlädBär as an Angular Developer, we expect you to have a basic level of familiarity with [Angular](https://angular.io/), as well as the NPM/Node.js ecosystem. Also, just in case you are working from a brand new computer, don't forget that you need to have [Node.js](https://nodejs.org/en/) installed.

### Install

If you haven't already, run the following command to install the needed dependencies for this project.

```bash
npm install
```

### Development

You will be working through a series of sprints. At the end of each sprint, we will bump up the app's version. The app is currently in [beta](./sprints/sprint-0-beta.md). Your first sprint is [sprint 1](./sprints1/sprint-1.md), working towards version 1 of the app. Each sprint will introduce changes to existing requirements or entirely new requirements. For each version of the app, there is a corresponding suite of [e2e tests](../salad-bar-e2e/src/integration/version-0-beta.spec.ts) already prepared for you.

For development we recommend that you run the dev server along with the e2e tests by simply running the following command.

```bash
nx e2e salad-bar-e2e --watch
```

Then select the test suite corresponding to the sprint you are currently working on. Tests for previous versions of the app are NOT expected to pass and there is no need to run them.
