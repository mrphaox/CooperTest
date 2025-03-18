import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Product } from '../model/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
})
export class ProductDialogComponent {
  private productService = inject(ProductsService);
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public product: Product | null
  ) {
    this.productForm = this.fb.group({
      nombre: [product?.nombre || '', Validators.required],
      descripcion: [product?.descripcion || '', Validators.required],
      precio: [product?.precio || 0, [Validators.required, Validators.min(1000)]],
      categoria: [product?.categoria || '', Validators.required],
    });
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const request = this.product
        ? this.productService.updateProduct(this.product._id!, this.productForm.value)
        : this.productService.createProduct(this.productForm.value);

      request.subscribe(() => this.dialogRef.close(true));
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
