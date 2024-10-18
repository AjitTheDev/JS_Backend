import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardHttpService } from '../../dashboard/services/dashboard-http.service';
import { IncomeHttpService } from '../services/income-http.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit{

  userIncomeList:any[]=[];
  totalUserIncome:number=0;
  isSuccess: boolean = false; 
  successMsg:any;
  isUpdateIncome:boolean=false;

  incomeForm = new FormGroup({
    amount: new FormControl(''),
    source: new FormControl(),
    recurring: new FormControl(),
    description: new FormControl(),
    _id: new FormControl(),
  })

  constructor(
    private _dashboardHttpService: DashboardHttpService,
    private _incomeHttpService: IncomeHttpService,
  ) {

  }

  ngOnInit(): void {
    this.getTotalIncome();
  }

  toggleOptions(income: any) {
    income.showOptions = !income.showOptions;
  }


  getTotalIncome() {
     this._dashboardHttpService.getUserIncome().subscribe(income => {
      if (income) {
        income.data.forEach((ic:any)=>{
            ic.showOptions=false
        })
        this.userIncomeList = income.data;
        this.totalUserIncome = this.userIncomeList.reduce((total,e)=>total + e.amount,0)
      }
    })
  }

  onAddIncome(){
    this._incomeHttpService.addIncome(this.incomeForm.value).subscribe(data=>{
      if(data){
       
        this.showSuccessMsg('added','')
        this.resetAll();
         
        setTimeout(() => {
         this.isSuccess = false;
       }, 3000);

        this.getTotalIncome();
      }
    })
  }

  editIncome(income:any){
    this.incomeForm.patchValue(income);
    this.isUpdateIncome=true;
  }

  onUpdateIncome(){
    console.log(this.incomeForm.value)
    this._incomeHttpService.updateIncome(this.incomeForm.value._id,this.incomeForm.value).subscribe(updatedIncome=>{
      if(updatedIncome){
        this.resetAll();
        this.showSuccessMsg('updated',this.incomeForm.value._id)
        setTimeout(() => {
         this.isSuccess = false;
       }, 3000);

        this.getTotalIncome();
      }
    })
  }

  deleteIncome(_id:any){
    this._incomeHttpService.deleteIncome(_id).subscribe(data=>{
      if(data){
           this.showSuccessMsg('deleted',_id)
        setTimeout(() => {
         this.isSuccess = false;
       }, 3000);

        this.getTotalIncome();
      }
      
    })
  }

  showSuccessMsg(action:any,id:any){
    this.showSnackbarMessage('hello snackbar', true)
    this.isSuccess = true;
    if(action=='deleted'){
      this.successMsg=`Income ${id} deleted successfully !`
    }else if(action=='added'){
      this.successMsg=`Income added successfully !`
    }else{
      this.successMsg=`Income updated successfully !`
    }
  }

  onCancel(){
    this.resetAll();
  }

  resetAll(){
    this.incomeForm.reset();
    this.isUpdateIncome=false;
  }

  showSnackbar = false;
  snackbarMessage = '';
  showSnackbarMessage(message: string, success: boolean) {
    this.snackbarMessage = message;
    this.isSuccess = success;
    this.showSnackbar = true;

    // Hide after 3 seconds
    setTimeout(() => {
      this.showSnackbar = false;
    }, 3000);
  }


}
