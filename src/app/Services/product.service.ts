// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Product } from '../models/product.model';
// import { environment } from '../../environments/environment';
// import { Observable } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class ProductService {

//   private baseUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}


//   getProducts() {
//     return this.http.get<Product[]>(`${this.baseUrl}/products`);
//   }

//     getProductById(id: number): Observable<Product> {
//     return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
//   }

//   createProduct(data: FormData) {
//   const token = localStorage.getItem('authToken'); // Token uthayein
  
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}` // Bearer scheme use karein
//   });

//   return this.http.post(`${this.baseUrl}/products/add`, data, { headers });
// }

// updateProduct(id: number, data: FormData): Observable<any> {
//     return this.http.put(`${this.baseUrl}/products/update/${id}`, data);
//   }

//   deleteProduct(id: number): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/products/delete/${id}`);
//   }


  
// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) {}

  updateProduct(id: number, data: FormData) {
    const token = this.authService.getToken();
    console.log('Update Product - Token:', token);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.baseUrl}/products/update/${id}`, data, { 
      headers 
    });
  }

  deleteProduct(id: number) {
    const token = this.authService.getToken();
    console.log('Delete Product - Token:', token);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.baseUrl}/products/delete/${id}`, { 
      headers 
    });
  }

  // Add headers to other methods too
  createProduct(data: FormData) {
    const token = this.authService.getToken();
    console.log('Create Product - Token:', token);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/products/add`, data, { 
      headers 
    });
  }

    getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }
}

