import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private _router: Router) {}

  login(token: string, userDetails: any) {
    localStorage.setItem('isAuthorized', 'true');
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    this.isAuthenticatedSubject.next(true);
    this._router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('isAuthorized');
    localStorage.removeItem('userDetails');
    this.isAuthenticatedSubject.next(false);
    this._router.navigate(['/login']);
  }

  hasToken(): boolean {
    return localStorage.getItem('isAuthorized') === 'true';
  }
}
