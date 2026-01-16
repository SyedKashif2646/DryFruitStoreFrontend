import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartSummary } from '../../Services/cart.service';
import { OrderService, CreateOrderDto } from '../../Services/order.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  totalItems: number = 0;
  isLoading: boolean = true;
  isSubmitting: boolean = false;

  // Order form data
  orderData: CreateOrderDto = {
    shippingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    paymentMethod: 'Cash On Delivery'
  };

  paymentMethods = [
    { id: 'cod', name: 'Cash On Delivery' },
    { id: 'card', name: 'Credit/Debit Card' },
  ];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    this.cartService.getCartItems().subscribe({
      next: (cartSummary: CartSummary) => {
        this.cartItems = cartSummary.items;
        this.totalAmount = cartSummary.totalAmount;
        this.totalItems = cartSummary.totalItems;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading cart:', error);
        this.isLoading = false;
        if (error.status === 401) {
          alert('Please login to proceed with checkout');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    const fileName = imagePath.split('\\').pop();
    return `https://localhost:7085/product-images/${fileName}`;
  }

  isLoggedIn(): boolean {
    return this.authService.getToken() !== null;
  }

  validateForm(): boolean {
    if (!this.orderData.shippingAddress.trim()) {
      alert('Please enter shipping address');
      return false;
    }
    if (!this.orderData.city.trim()) {
      alert('Please enter city');
      return false;
    }
    if (!this.orderData.state.trim()) {
      alert('Please enter state');
      return false;
    }
    if (!this.orderData.zipCode.trim()) {
      alert('Please enter zip code');
      return false;
    }
    if (!this.orderData.phoneNumber.trim() || this.orderData.phoneNumber.length < 10) {
      alert('Please enter a valid phone number (at least 10 digits)');
      return false;
    }
    return true;
  }

  placeOrder(): void {
    if (!this.validateForm()) {
      return;
    }

    if (this.cartItems.length === 0) {
      alert('Your cart is empty. Add some items before placing an order.');
      return;
    }

    if (confirm('Are you sure you want to place this order?')) {
      this.isSubmitting = true;

      this.orderService.createOrder(this.orderData).subscribe({
        next: (response: any) => {
          this.isSubmitting = false;
          alert(`Order placed successfully!\nOrder ID: ${response.orderId}\nTotal Amount: ${response.totalAmount}`);
          this.router.navigate(['/orders']);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error placing order:', error);
          
          if (error.status === 400 && error.error?.message) {
            alert(`Order failed: ${error.error.message}`);
          } else if (error.status === 401) {
            alert('Session expired. Please login again.');
            this.authService.logout();
            this.router.navigate(['/login']);
          } else {
            alert('Failed to place order. Please try again.');
          }
        }
      });
    }
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }
}