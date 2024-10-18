import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseHttpService {

  constructor(private _httpService:HttpService) { }

  addExpense(data:any){
   return this._httpService.post('api/v1/expense/addExpense',data)
  }

  updateExpense(_id:any,data:any){
   return this._httpService.put(`api/v1/expense/updateExpenseById/${_id}`,data)
  }

  deleteExpense(id:any){
    return this._httpService.delete(`api/v1/expense/deleteExpenseById/${id}`,)
  }
  
}
