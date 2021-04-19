import { Injectable } from '@angular/core';
import { Salad } from './salad';

@Injectable({ providedIn: 'root' })
export class SaladService {
  salad = new Salad();
  step = 1;
}
