// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';
// import { BehaviorSubject } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//     private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());


//   private baseUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//     isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
//     private hasToken(): boolean {
//     return !!localStorage.getItem('authToken');
//   }

//    getToken(): string | null {
//     return localStorage.getItem('authToken');
//   }


// getUserRole(): string | null {
//   const token = this.getToken();
//   if (!token) return null;

//   const payload = JSON.parse(atob(token.split('.')[1]));

//   return (
//     payload.role ||
//     payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
//   );
// }




//   login(data: any) {
//     return this.http.post<any>(`${this.baseUrl}/auth/login`, data);
//   }
//   // login(token: string): void {
//   //   localStorage.setItem('authToken', token);
//   //   this.isAuthenticatedSubject.next(true); // Notify subscribers
//   // }

//   register(data: any) {
//   return this.http.post(`${this.baseUrl}/auth/register`, data);
// }
//  logout(): void {
//     // Remove token from localStorage
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');
    
//     // If you have a backend, you should also call logout API
//     // this.http.post(`${this.apiUrl}/logout`, {}).subscribe();
//   }

// // logout(): void {
// //     localStorage.removeItem('authToken');
// //     localStorage.removeItem('user');
// //     this.isAuthenticatedSubject.next(false); // Notify subscribers
// //   }



//   saveToken(token: string) {
//     localStorage.setItem('token', token);
//   }

//   // getToken() {
//   //   return localStorage.getItem('token');
//   // }

  
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || 
             payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    } catch {
      return null;
    }
  }

  login(data: any) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, data);
  }

  // ✅ Yeh method add karein
  // setLogin(token: string): void {
  //   localStorage.setItem('authToken', token);
  //   this.isAuthenticatedSubject.next(true); // ✅ State update karein
  // }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

// Baki code same rahega...

setLogin(token: string): void {
  localStorage.setItem('authToken', token);
  this.isAuthenticatedSubject.next(true); // Isse Navbar update hoga
}

logout(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  this.isAuthenticatedSubject.next(false); // Isse Navbar vapas update hoga
}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}