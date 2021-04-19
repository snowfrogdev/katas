import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { SaladGuard } from './salad.guard';
import { StepperComponent } from './stepper/stepper.component';
import { LettuceComponent } from './steps/lettuce/lettuce.component';
import { SaladComponent } from './steps/salad/salad.component';
import { ToppingsComponent } from './steps/toppings/toppings.component';
import { VeggiesComponent } from './steps/veggies/veggies.component';

const routes: Routes = [
  { path: 'lettuce', component: LettuceComponent, canActivate: [SaladGuard] },
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
