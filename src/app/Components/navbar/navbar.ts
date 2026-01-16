import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { CartService } from '../../Services/cart.service'; // ✅ Add this
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isLoggedIn$: Observable<boolean>;
  cartCount: number = 0; // ✅ Add this

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService // ✅ Add this
  ) {
    this.isLoggedIn$ = this.authService.isAuthenticated$;
    
    // ✅ Load cart count when user logs in
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.loadCartCount();
      } else {
        this.cartCount = 0;
      }
    });
  }

  // ✅ Add this method
  loadCartCount(): void {
    this.cartService.getCartItems().subscribe({
      next: (cartSummary) => {
        this.cartCount = cartSummary.totalItems;
      },
      error: (error) => {
        console.error('Error loading cart count:', error);
        this.cartCount = 0;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}