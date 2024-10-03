import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardHttpService {

  constructor(private _httpService:HttpService) { }

  getUsers(){
   return this._httpService.get('api/v1/user/getUsers')
  }
  logOut(){
   return this._httpService.get('api/v1/user/logoutUser')
  }
  getUserExpense(){
   return this._httpService.get('api/v1/expense/getUserExpense')
  }
  getUserIncome(){
   return this._httpService.get('api/v1/income/getUserIncome')
  }
  
}
