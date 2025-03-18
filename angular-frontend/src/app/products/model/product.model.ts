export interface Product {
  _id?: string;  // Opcional si el backend lo genera automáticamente
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
}
