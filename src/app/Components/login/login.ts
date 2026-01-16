import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Add Router import
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true, // Add this if using standalone
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule] // Keep FormsModule for ngModel
})
export class LoginComponent {

  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router // Inject Router
  ) {}

 onLogin() {
  this.authService.login(this.loginData).subscribe({
    next: (res) => {
      // 'saveToken' ki jagah 'setLogin' use karein
      // Kyunki setLogin token save bhi karta hai aur Navbar ko signal bhi deta hai
      this.authService.setLogin(res.token); 
      
      alert('Login successful');
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error('Login error:', err);
      alert('Invalid email or password');
    }
  });
}
  
}