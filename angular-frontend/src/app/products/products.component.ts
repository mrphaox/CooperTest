import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductsService } from './products.service';
import { Product } from './model/product.model';
import { ProductDialogComponent } from './modals/product-dialog.component';
import { DeleteConfirmDialogComponent } from './modals/delete-confirm-dialog.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductsService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'categoria', 'acciones'];
  searchTerm = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.productsSubject.next(data),
      error: () => console.error('Error al cargar productos.')
    });
  }

  /** Getter optimizado */
  get filteredProducts(): Product[] {
    const term = this.searchTerm.toLowerCase().trim();
    return this.productsSubject.getValue().filter(product =>
      product.nombre.toLowerCase().includes(term) ||
      product.categoria.toLowerCase().includes(term)
    );
  }

  openEditDialog(product?: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: product || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadProducts();
    });
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, { width: '350px' });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        const updatedProducts = this.productsSubject.getValue().filter(product => product._id !== id);
        this.productsSubject.next(updatedProducts);

        this.productService.deleteProduct(id).subscribe({
          next: () => console.log('Producto eliminado con éxito'),
          error: (err) => {
            console.error('Error al eliminar producto', err);
            this.loadProducts(); // Vuelve a cargar la lista en caso de error
          }
        });
      }
    });
  }


  logout(): void {
    console.log('Cerrando sesión...');
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
