import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard'; // El guard lo generas normalmente
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];
