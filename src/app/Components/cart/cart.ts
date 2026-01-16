import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem, CartSummary } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  totalItems: number = 0;
  isLoading: boolean = true;

  constructor(
    private cartService: CartService,
    private authService: AuthService
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
      }
    });
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity < 1) {
      this.removeItem(item.id);
      return;
    }

    this.cartService.updateCartItem(item.id, { quantity: newQuantity }).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (error) => {
        console.error('Error updating quantity:', error);
        alert('Failed to update quantity');
      }
    });
  }

  removeItem(id: number): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeFromCart(id).subscribe({
        next: () => {
          this.loadCart();
        },
        error: (error) => {
          console.error('Error removing item:', error);
          alert('Failed to remove item');
        }
      });
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart().subscribe({
        next: () => {
          this.loadCart();
        },
        error: (error) => {
          console.error('Error clearing cart:', error);
          alert('Failed to clear cart');
        }
      });
    }
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    const fileName = imagePath.split('\\').pop();
    return `https://localhost:7085/product-images/${fileName}`;
  }

  isLoggedIn(): boolean {
    return this.authService.getToken() !== null;
  }
}