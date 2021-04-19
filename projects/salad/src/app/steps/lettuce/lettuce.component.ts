import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Salad } from '../../salad';
import { SaladService } from '../../salad.service';

@Component({
  templateUrl: './lettuce.component.html',
})
export class LettuceComponent implements OnInit {
  salad!: Salad;

  constructor(private saladService: SaladService, private router: Router) {}

  ngOnInit(): void {
    this.salad = this.saladService.salad;
    this.saladService.step = 1;
  }

  next(): void {
    this.router.navigateByUrl('veggies');
    localStorage.setItem('salad', JSON.stringify(this.saladService.salad));
  }
}
