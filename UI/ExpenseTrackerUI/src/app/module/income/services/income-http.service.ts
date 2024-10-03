import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeHttpService {

  constructor(private _httpService:HttpService) { }

  addIncome(data:any){
   return this._httpService.post('api/v1/income/addIncome',data)
  }

  deleteIncome(id:any){
    return this._httpService.delete(`api/v1/income/deleteUserIncome/${id}`,)
  }
  
}
