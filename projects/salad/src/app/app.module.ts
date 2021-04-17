import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { LettuceComponent } from './lettuce/lettuce.component';
import { SaladGuard } from './salad.guard';
import { SaladComponent } from './salad/salad.component';
import { StepperComponent } from './stepper/stepper.component';
import { ToppingsComponent } from './toppings/toppings.component';
import { VeggiesComponent } from './veggies/veggies.component';

const routes: Routes = [
  { path: 'lettuce', component: LettuceComponent },
  { path: 'veggies', component: VeggiesComponent, canActivate: [SaladGuard] },
  { path: 'toppings', component: ToppingsComponent, canActivate: [SaladGuard] },
  { path: 'salad', component: SaladComponent, canActivate: [SaladGuard] },
  { path: '', redirectTo: '/lettuce', pathMatch: 'full' },
  { path: '**', redirectTo: '/lettuce', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, StepperComponent, LettuceComponent, VeggiesComponent, ToppingsComponent, SaladComponent],
  imports: [BrowserModule, FormsModule, MDBBootstrapModule.forRoot(), RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
