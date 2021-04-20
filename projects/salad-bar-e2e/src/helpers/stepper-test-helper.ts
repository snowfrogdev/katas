export class StepperTestHelper {
  constructor(private stepNames: string[]) {}

  test(stepIndex: number): void {
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
