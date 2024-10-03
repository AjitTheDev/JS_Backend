import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { UserModule } from './module/user/user.module';
import { CookieService } from 'ngx-cookie-service';
import { DashboardModule } from './module/dashboard/dashboard.module';
import { AuthInterceptor } from './core/services/interceptors/auth.interceptor';
import { IncomeModule } from './module/income/income.module';
import { ExpenseModule } from './module/expense/expense.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,    //added here too
    ReactiveFormsModule, //added here too
    CoreModule,
    UserModule,
    DashboardModule,
    IncomeModule,
    ExpenseModule
  ],
  providers: [CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
