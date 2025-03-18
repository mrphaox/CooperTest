// src/app/auth/register/register.component.ts
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
  selector: 'app-register',
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
    <div class="register-wrapper">
      <div class="animated-background"></div>
      <div class="register-container text-black">
        <mat-card>
          <mat-card-title class="title">Crear Cuenta</mat-card-title>
          <mat-card-content class="text-black">
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="custom-field">
                <mat-label>Nombre de usuario</mat-label>
                <input class="text-black" matInput formControlName="username" type="text" />
                <mat-icon matSuffix>person</mat-icon>
                <mat-error *ngIf="registerForm.get('username')?.hasError('required')">
                  El nombre de usuario es obligatorio
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="custom-field">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" type="email" />
                <mat-icon matSuffix>email</mat-icon>
                <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                  El email es obligatorio
                </mat-error>
                <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                  Formato de email inválido
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="custom-field">
                <mat-label>Contraseña</mat-label>
                <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'" />
                <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                  <mat-icon>{{ hidePassword ? 'visibility' : 'visibility_off' }}</mat-icon>
                </button>
                <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                  La contraseña es obligatoria
                </mat-error>
              </mat-form-field>

              <div class="actions">
                <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">
                  Registrarse
                </button>
              </div>

              <p class="error-message" *ngIf="errorMessage">{{ errorMessage }}</p>
            </form>

            <div class="link-container">
              <span> ¿Ya tienes cuenta? </span>
              <a routerLink="/login"> Inicia sesión </a>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .register-wrapper {
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      text-color:black;
    }
    .animated-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(-45deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF);
      background-size: 400% 400%;
      animation: gradientAnimation 12s ease infinite;
      z-index: -1;
    }
    @keyframes gradientAnimation {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .register-container {
      width: 100%;
      max-width: 400px;
      padding: 1rem;
      z-index: 2;
    }
    mat-card {
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
      background: white;
    }
    .title {
      text-align: center;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    .custom-field {
      width: 100%;
      margin-bottom: 1rem;
    }
    .actions {
      display: flex;
      justify-content: center;
      margin-top: 1.5rem;
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
      color: #333;
      font-weight: bold;
      text-decoration: none;
      transition: 0.3s;
    }
    .link-container a:hover {
      text-decoration: underline;
      color: #ff6b6b;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  errorMessage = '';

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.registerForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, email, password, role } = this.registerForm.value;

      const userData = {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        role: role ? role.trim() : 'user' // 🔥 Asigna un valor por defecto si está vacío
      };

      this.authService.register(userData).subscribe({
        next: () => this.router.navigate(['/login']), // 🔥 Redirige tras registro
        error: (err) => {
          console.error('Error en registro:', err);

          if (err.status === 400) {
            this.errorMessage = err.error?.message || 'Datos incorrectos. Verifica la información ingresada.';
          } else if (err.status === 500) {
            this.errorMessage = 'Error en el servidor. Inténtalo más tarde.';
          } else {
            this.errorMessage = 'Hubo un error en el registro. Intenta nuevamente.';
          }
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }


}
