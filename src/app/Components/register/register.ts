import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  registerData = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router:Router) {}

  onRegister() {
    this.authService.register(this.registerData).subscribe({
      next: () => {
        alert('Registration successful. Please login.');
      },
      error: (err) => {
        alert(err.error?.message || 'Registration failed');
      }
    });
  }

  goToLogin() {
  this.router.navigate(['/login']);
}
}
