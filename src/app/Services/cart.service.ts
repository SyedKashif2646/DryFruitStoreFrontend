import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
  imagePath: string;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export interface AddToCartDto {
  productId: number;
  quantity: number;
}

export interface UpdateCartDto {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Add item to cart
  addToCart(data: AddToCartDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart/add`, data);
  }

  // Get cart items
  getCartItems(): Observable<CartSummary> {
    return this.http.get<CartSummary>(`${this.baseUrl}/cart`);
  }

  // Update cart item quantity
  updateCartItem(id: number, data: UpdateCartDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/cart/update/${id}`, data);
  }

  // Remove item from cart
  removeFromCart(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/remove/${id}`);
  }

  // Clear cart
  clearCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/clear`);
  }
}