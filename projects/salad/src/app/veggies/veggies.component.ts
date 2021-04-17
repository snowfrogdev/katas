import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Salad } from '../salad';
import { SaladService } from '../salad.service';

@Component({
  templateUrl: './veggies.component.html',
})
export class VeggiesComponent implements OnInit {
  salad!: Salad;

  constructor(private saladService: SaladService, private router: Router) {}

  ngOnInit(): void {
    this.salad = this.saladService.salad;
    this.saladService.step = 2;
  }

  next(): void {
    this.router.navigateByUrl('toppings');
  }
}
