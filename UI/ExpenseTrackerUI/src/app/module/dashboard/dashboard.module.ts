import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { RecentHistoryComponent } from './components/recent-history/recent-history.component';
import { TotalExpenseComponent } from './components/total-expense/total-expense.component';
import { TotalIncomeComponent } from './components/total-income/total-income.component';
import { TotalBalanceComponent } from './components/total-balance/total-balance.component';



@NgModule({
  declarations: [
    ContainerComponent,
    RecentHistoryComponent,
    TotalExpenseComponent,
    TotalIncomeComponent,
    TotalBalanceComponent
  ],
  imports: [
    CommonModule,
    
  ]
})
export class DashboardModule { }
