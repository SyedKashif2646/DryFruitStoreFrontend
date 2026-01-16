import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CreateOrderDto {
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  paymentMethod: string;
}

// order.service.ts (add to existing)
export interface Order {
  id: number;
  orderDate: Date;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  paymentMethod: string;
  items: OrderItem[];
}

export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  imagePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Create order
  createOrder(data: CreateOrderDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/create`, data);
  }

  // Get user orders
  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders/my-orders`);
  }

  // Get order details
  getOrderDetails(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${id}`);
  }
}