import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Salad } from '../salad';
import { SaladService } from '../salad.service';

@Component({
  templateUrl: './toppings.component.html',
})
export class ToppingsComponent implements OnInit {
  salad!: Salad;

  constructor(private saladService: SaladService, private router: Router) {}

  ngOnInit(): void {
    this.salad = this.saladService.salad;
    this.saladService.step = 3;
  }

  next(): void {
    this.router.navigateByUrl('salad');
  }
}
