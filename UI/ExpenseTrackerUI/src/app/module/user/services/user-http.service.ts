import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private _httpService:HttpService) { }

  registerUser(data:any){
   return this._httpService.post('api/v1/user/registerUser',data)
  }
  
  loginUser(data:any){
   return this._httpService.post('api/v1/user/loginUser',data)
  }
}
