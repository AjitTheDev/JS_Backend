import { Component } from '@angular/core';
import { DashboardHttpService } from '../../dashboard/services/dashboard-http.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ExpenseHttpService } from '../services/expense-http.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  userExpenseList:any[]=[];
  totalUserExpense:number=0;
  isSuccess: boolean = false; 
  successMsg:any;

  expenseForm = new FormGroup({
    amount: new FormControl(''),
    category: new FormControl(),
    recurring: new FormControl(false),
    description: new FormControl(),
    date: new FormControl(),
    paymentMethod: new FormControl(),
  })

  constructor(
    private _dashboardHttpService: DashboardHttpService,
    private _expenseHttpService: ExpenseHttpService,
  ) {

  }

  ngOnInit(): void {
    this.getTotalExpense();
  }

  getTotalExpense() {
     this._dashboardHttpService.getUserExpense().subscribe(expense => {
      if (expense) {
        this.userExpenseList = expense.data;
        this.totalUserExpense = this.userExpenseList.reduce((total,e)=>total + e.amount,0)
      }
    })
  }

  onAddExpense(){
    this._expenseHttpService.addExpense(this.expenseForm.value).subscribe(data=>{
      if(data){
       
        this.showSuccessMsg(false,'')
        this.expenseForm.reset();
         
        setTimeout(() => {
         this.isSuccess = false;
       }, 3000);

        this.getTotalExpense();
      }
    })
  }

  deleteExpense(_id:any){
    this._expenseHttpService.deleteExpense(_id).subscribe(data=>{
      if(data){
           this.showSuccessMsg(true,_id)
        setTimeout(() => {
         this.isSuccess = false;
       }, 3000);

        this.getTotalExpense();
      }
      
    })
  }

  showSuccessMsg(isDeleteMsg:any,id:any){
    this.isSuccess = true;
    if(isDeleteMsg){
      this.successMsg=`Expense ${id} deleted successfully !`
    }else{
      this.successMsg=`Expense added successfully !`
    }
  }
}
