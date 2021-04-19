import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Salad } from './salad';
import { SaladService } from './salad.service';

@Injectable({
  providedIn: 'root',
})
export class SaladGuard implements CanActivate {
  constructor(private saladService: SaladService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
    const stringifiedSalad: string | null = localStorage.getItem('salad');

    if (stringifiedSalad) {
      const { lettuce, veggies, toppings } = JSON.parse(stringifiedSalad);

      const salad = new Salad();
      salad.lettuce = lettuce;
      salad.veggies = veggies;
      salad.toppings = toppings;

      this.saladService.salad = salad;
    }

    if (state.url === '/salad' && !this.saladService.salad.toppings) return this.router.parseUrl('/toppings');
    if (state.url === '/toppings' && !this.saladService.salad.veggies) return this.router.parseUrl('/veggies');
    if (state.url === '/veggies' && !this.saladService.salad.lettuce) return this.router.parseUrl('/lettuce');

    return true;
  }
}
