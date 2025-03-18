import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule
  ],
  template: `
    <h2 mat-dialog-title>¿Eliminar Producto?</h2>
    <mat-dialog-content>
      <p>Esta acción no se puede deshacer. ¿Estás seguro?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close(false)">Cancelar</button>
      <button mat-raised-button color="warn" (click)="dialogRef.close(true)">Eliminar</button>
    </mat-dialog-actions>
  `,
})
export class DeleteConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>) {}
}
