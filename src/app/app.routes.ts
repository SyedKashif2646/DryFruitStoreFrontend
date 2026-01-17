import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login';
import { RegisterComponent } from './Components/register/register';
import { About } from './Components/about/about';
import { PolicyComponent } from './Components/policy/policy';
import { DashboardComponent } from './Components/dashboard/dashboard';
import { HomeComponent } from './Components/home/home';
import { CartComponent } from './Components/cart/cart';
import { CheckoutComponent } from './Components/checkout/checkout';
import { AuthGuard } from './guards/auth-guard';


export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' }, // default

    {path:'home' ,component:HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path:'about', component:About},
    {path:'policy', component:PolicyComponent},
  // 🔒 Protected Routes
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },

  
];
