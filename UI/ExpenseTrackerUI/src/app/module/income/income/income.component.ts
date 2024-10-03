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

  incomeForm = new FormGroup({
    amount: new FormControl(''),
    source: new FormControl(),
    recurring: new FormControl(),
    description: new FormControl()
  })

  constructor(
    private _dashboardHttpService: DashboardHttpService,
    private _incomeHttpService: IncomeHttpService,
  ) {

  }

  ngOnInit(): void {
    this.getTotalIncome();
  }

  getTotalIncome() {
     this._dashboardHttpService.getUserIncome().subscribe(income => {
      if (income) {
        this.userIncomeList = income.data;
        this.totalUserIncome = this.userIncomeList.reduce((total,e)=>total + e.amount,0)
      }
    })
  }

  onAddIncome(){
    this._incomeHttpService.addIncome(this.incomeForm.value).subscribe(data=>{
      if(data){
       
        this.showSuccessMsg(false,'')
        this.incomeForm.reset();
         
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
           this.showSuccessMsg(true,_id)
        setTimeout(() => {
         this.isSuccess = false;
       }, 3000);

        this.getTotalIncome();
      }
      
    })
  }

  showSuccessMsg(isDeleteMsg:any,id:any){
    this.isSuccess = true;
    if(isDeleteMsg){
      this.successMsg=`Income ${id} deleted successfully !`
    }else{
      this.successMsg=`Income added successfully !`
    }
  }


}
