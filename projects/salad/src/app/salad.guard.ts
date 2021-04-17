import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SaladService } from './salad.service';

@Injectable({
  providedIn: 'root',
})
export class SaladGuard implements CanActivate {
  constructor(private saladService: SaladService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
    if (state.url === '/salad' && !this.saladService.salad.toppings) return this.router.parseUrl('/toppings');
    if (state.url === '/toppings' && !this.saladService.salad.veggies) return this.router.parseUrl('/veggies');
    if (state.url === '/veggies' && !this.saladService.salad.lettuce) return this.router.parseUrl('/lettuce');

    return true;
  }
}
