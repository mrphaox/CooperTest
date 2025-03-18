import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
  <div class="login-wrapper">
    <div class="animated-background"></div>
    <div class="login-container">
      <mat-card>
        <mat-card-title class="title">Iniciar Sesión</mat-card-title>
        <mat-card-content class="text-black">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="custom-field">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" />
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                El email es obligatorio
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Formato de email inválido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="custom-field">
              <mat-label>Contraseña</mat-label>
              <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'" />
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{ hidePassword ? 'visibility' : 'visibility_off' }}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                La contraseña es obligatoria
              </mat-error>
            </mat-form-field>

            <div class="actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
                Entrar
              </button>
            </div>
          </form>

          <p class="error-message" *ngIf="errorMessage">{{ errorMessage }}</p>

          <div class="link-container">
            <span> ¿No tienes cuenta? </span>
            <a routerLink="/register"> Regístrate</a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      overflow: hidden;
      position: relative;
    }
    .login-wrapper {
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .animated-background {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(-45deg, rgb(84, 242, 139), rgb(186, 186, 242), rgb(193, 184, 154), rgb(10, 238, 120));
      background-size: 400% 400%;
      animation: gradientAnimation 10s ease infinite;
      z-index: -1;
    }
    @keyframes gradientAnimation {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .login-container {
      width: 100%;
      max-width: 400px;
      z-index: 2;
      animation: fadeIn 1.2s ease-in-out;
      background: white;
      border-radius: 15px;
    }
    mat-card {
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.1);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    mat-form-field {
      display: block;
      width: 100%;
      margin-bottom: 1rem;
    }
    .custom-field input {
      color: black !important; /* 🔥 Hace que el texto dentro del input sea negro */
    }
    .custom-field mat-label {
      color: black !important; /* 🔥 Hace que el label del input sea negro */
    }
    .custom-field input::placeholder {
      color: black !important; /* 🔥 Hace que el placeholder del input sea negro */
    }
    .actions {
      display: flex;
      justify-content: center;
      margin-top: 1.5rem;
    }
    button {
      width: 100%;
      padding: 0.8rem;
      font-size: 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    button:hover {
      transform: scale(1.05);
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    }
    .error-message {
      color: #d32f2f;
      text-align: center;
      margin-top: 1rem;
      font-size: 0.9rem;
    }
    .link-container {
      margin-top: 1.5rem;
      text-align: center;
      font-size: 0.9rem;
    }
    .link-container a {
      color: rgb(0, 0, 0);
      font-weight: bold;
      text-decoration: none;
      transition: 0.3s;
    }
    .link-container a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  errorMessage = '';

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Datos enviados:', { email, password });
      this.authService.login(email, password).subscribe({
        next: (resp) => {
          console.log('Respuesta del servidor:', resp);
          this.authService.saveToken(resp.token);
          this.router.navigate(['/products']);  // 🔥 Redirección a /products
        },
        error: (err) => {
          console.error('Error en login:', err);
          this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        }
      });
    }
  }
}
