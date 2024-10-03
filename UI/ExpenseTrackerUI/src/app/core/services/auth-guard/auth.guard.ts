import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthorized = localStorage.getItem('isAuthorized') === 'true';
    if (!isAuthorized) {
      this.router.navigate(['/login']);
      return false; // Not authorized, prevent access to the route
    }
    return true; // Authorized, allow access to the route
  }
}
