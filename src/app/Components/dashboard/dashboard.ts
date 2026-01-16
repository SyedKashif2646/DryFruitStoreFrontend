import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Product } from '../../models/product.model';
import { ProductService } from '../../Services/product.service';
import { AuthService } from '../../Services/auth.service';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  isAdmin = false;
  showProductForm = false;
  isEditMode = false;
  editingProductId: number | null = null;

  product: Product = {
    id: 0, // Add id with default value
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    imagePath: ''
  };

  selectedImage: File | null = null;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
     private cartService: CartService, // ✅ Add this
    private router: Router // ✅ Add this
  ) {}

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

  ngOnInit() {
    this.isAdmin = this.authService.getUserRole() === 'Admin';
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        alert('Failed to load products');
      }
    });
  }

  toggleForm() {
    this.showProductForm = !this.showProductForm;
    this.isEditMode = false;
    this.editingProductId = null;
    
    if (!this.showProductForm) {
      this.resetForm();
    }
  }

  onImageSelect(event: any) {
    this.selectedImage = event.target.files[0];
  }

  // Edit Product
 editProduct(product: Product) {
  console.log('Edit clicked for product ID:', product.id);
  console.log('Is Admin:', this.isAdmin);
  console.log('Token:', this.authService.getToken());
  
  this.isEditMode = true;
  this.editingProductId = product.id;
  this.product = { ...product };
  this.showProductForm = true;
  this.selectedImage = null;
}
  // Delete Product
  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product');
        }
      });
    }
  }

  createProduct() {
    if (!this.validateForm()) return;

    const formData = this.prepareFormData();

    if (this.isEditMode && this.editingProductId) {
      // Update existing product
      this.productService.updateProduct(this.editingProductId, formData).subscribe({
        next: () => {
          alert('Product updated successfully!');
          this.loadProducts();
          this.resetFormAndClose();
        },
        error: (error) => {
          console.error('Error updating product:', error);
          alert('Failed to update product');
        }
      });
    } else {
      // Create new product
      this.productService.createProduct(formData).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.loadProducts();
          this.resetFormAndClose();
        },
        error: (error) => {
          console.error('Error adding product:', error);
          alert('Failed to add product');
        }
      });
    }
  }

  private validateForm(): boolean {
    if (!this.product.name || !this.product.price) {
      alert('Please fill in all required fields');
      return false;
    }

    if (!this.isEditMode && !this.selectedImage) {
      alert('Please select an image for new product');
      return false;
    }

    return true;
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('quantity', this.product.quantity.toString());
    
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    return formData;
  }

  private resetFormAndClose() {
    this.resetForm();
    this.showProductForm = false;
    this.isEditMode = false;
    this.editingProductId = null;
  }

  resetForm() {
    this.product = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      imagePath: ''
    };
    this.selectedImage = null;
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    const fileName = imagePath.split('\\').pop();
    return `https://localhost:7085/product-images/${fileName}`;
  }
}