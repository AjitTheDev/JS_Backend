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
  isUpdateMode:boolean=false;

  expenseForm = new FormGroup({
    amount: new FormControl(''),
    category: new FormControl(),
    recurring: new FormControl(false),
    description: new FormControl(),
    date: new FormControl(),
    paymentMethod: new FormControl(),
    _id: new FormControl(),
  })

  constructor(
    private _dashboardHttpService: DashboardHttpService,
    private _expenseHttpService: ExpenseHttpService,
  ) {

  }

  ngOnInit(): void {
    this.getTotalExpense();
  }

  toggleOptions(expense: any) {
    expense.showOptions = !expense.showOptions;
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
       
        this.showSuccessMsg('added','')
        this.resetAll();
         
        setTimeout(() => {
         this.isSuccess = false;
       }, 3000);

        this.getTotalExpense();
      }
    })
  }

  editExpense(expense:any){
    this.expenseForm.patchValue(expense);
    this.isUpdateMode=true
  }

  onUpdateExpense(){
    this._expenseHttpService.updateExpense(this.expenseForm.value._id, this.expenseForm.value).subscribe(expense=>{
      if(expense){
        this.showSuccessMsg('added','')
        this.resetAll();
         
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
           this.showSuccessMsg('deleted',_id)
        setTimeout(() => {
         this.isSuccess = false;
       }, 3000);

        this.getTotalExpense();
      }
      
    })
  }

  showSuccessMsg(action:any,id:any){
    this.isSuccess = true;
    if(action=="deleted"){
      this.successMsg=`Expense ${id} deleted successfully !`
    }else if(action =='added'){
      this.successMsg=`Expense added successfully !`
    }else{
      this.successMsg=`Expense ${id} updated successfully !`
    }
  }

  onCancel(){
    this.resetAll();
  }

  resetAll(){
    this.expenseForm.reset();
    this.isUpdateMode=false;
  }
}
