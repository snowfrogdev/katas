import { Component, OnInit } from '@angular/core';
import { Salad } from '../../salad';
import { SaladService } from '../../salad.service';

@Component({
  templateUrl: './salad.component.html',
})
export class SaladComponent implements OnInit {
  salad!: Salad | null;

  constructor(private saladService: SaladService) {}

  ngOnInit(): void {
    this.salad = this.saladService.salad;
    this.saladService.step = 4;
  }

  confirm(): void {
    this.salad = null;
    this.saladService.salad = new Salad();
    localStorage.setItem('salad', JSON.stringify(this.saladService.salad));
  }
}
