import { Component } from '@angular/core';
import { SaladService } from '../salad.service';

@Component({
  selector: 'salad-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  constructor(private saladService: SaladService) {}

  getStatus(step: number): string {
    if (this.saladService.step === step) return 'active';
    if (this.saladService.step > step) return 'completed';
    return '';
  }
}
