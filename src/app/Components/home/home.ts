import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  
  products: Product[] = [];
  isLoading = true;

  constructor(
    private router: Router,
    private productService: ProductService,
     private cartService: CartService, // ✅ Add this
    private authService: AuthService // ✅ Add this
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

   
  // ✅ ADD THIS: Check if user is logged in
  isLoggedIn(): boolean {
    return this.authService.getToken() !== null;
  }

  // ✅ ADD THIS: Add to Cart method
  addToCart(productId: number): void {
    if (!this.isLoggedIn()) {
      alert('Please login to add items to cart');
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart({ productId, quantity: 1 }).subscribe({
      next: () => {
        alert('Added to cart successfully!');
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        alert('Failed to add to cart. Please try again.');
      }
    });
  }


  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  goToDashboard() {
    console.log('Navigating to dashboard...');
    this.router.navigate(['/dashboard'])
      .then(success => {
        console.log('Navigation successful:', success);
      })
      .catch(error => {
        console.error('Navigation failed:', error);
      });
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    const fileName = imagePath.split('\\').pop();
    return `https://localhost:7085/product-images/${fileName}`;
  }
}