import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './module/user/components/login/login.component';
import { RegisterComponent } from './module/user/components/register/register.component';
import { ContainerComponent } from './module/dashboard/components/container/container.component';
import { RecentHistoryComponent } from './module/dashboard/components/recent-history/recent-history.component';
import { AuthGuard } from './core/services/auth-guard/auth.guard';
import { IncomeComponent } from './module/income/income/income.component';
import { ExpenseComponent } from './module/expense/expense/expense.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'dashboard', 
    component: ContainerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // default dashboard home
      { path: 'home', component: RecentHistoryComponent }, // Home/Dashboard component
    ]
  },
   // { path: 'transactions', component: TransactionsComponent }, // Transactions component
   { path: 'incomes', component: IncomeComponent,canActivate:[AuthGuard] }, // Incomes component
   { path: 'expenses', component: ExpenseComponent }, // Expenses component
  { path: '**', redirectTo: 'login' } // Redirect invalid routes
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
