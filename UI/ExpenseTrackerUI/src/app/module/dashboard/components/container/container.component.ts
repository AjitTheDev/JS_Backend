import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DashboardHttpService } from '../../services/dashboard-http.service';
import { forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent implements OnInit {
  totalUserIncome:number=0;
  totalUserExpense:number=0;

  userIncomeList:any[]=[];
  userExpenseList:any[]=[];
  totalBalance:number =0;
  constructor(private _dashboardHttpService:DashboardHttpService){
    
  }

  ngOnInit(): void {
    forkJoin([this.getTotalIncome(), this.getTotalExpenses()]).subscribe(() => {
      this.calculateTotalBalance(); // Call this only after both API calls are done
  });
  }
  getTotalIncome() {
    return this._dashboardHttpService.getUserIncome().pipe(
        tap(income => {
            if (income) {
                this.userIncomeList = income.data;
                this.totalUserIncome = this.userIncomeList.reduce((total, e) => total + e.amount, 0);
                console.log('this.totalUserIncome', this.totalUserIncome);
            }
        })
    ).toPromise(); // convert Observable to Promise for forkJoin
  }

  getTotalExpenses() {
    return this._dashboardHttpService.getUserExpense().pipe(
        tap(expense => {
            if (expense) {
                this.userExpenseList = expense.data;
                this.totalUserExpense = this.userExpenseList.reduce((total, e) => total + e.amount, 0);
                console.log('this.totalUserExpense', this.totalUserExpense);
            }
        })
    ).toPromise();
  }


  calculateTotalBalance(){
    this.totalBalance = this.totalUserIncome - this.totalUserExpense
  }

 

}
