// src/app/auth.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // If a 403 Forbidden error occurs, redirect to the login page
        if (error.status === 403) {
          this.clearDetails();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }

  clearDetails(){
    localStorage.clear()
  }
  
}




