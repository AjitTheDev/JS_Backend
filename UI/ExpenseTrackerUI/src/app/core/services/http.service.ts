import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  private apiUrl = 'http://localhost:6700'; // Replace with your API URL

  constructor(private _http: HttpClient) { }

  // GET method
  get(endpoint: string, params?: any, headers?: HttpHeaders): Observable<any> {
    return this._http.get(`${this.apiUrl}/${endpoint}`, { params, headers,withCredentials: true  });
  }

  // POST method
  post(endpoint: string, data: any, headers?: HttpHeaders): Observable<any> {
    return this._http.post(`${this.apiUrl}/${endpoint}`, data, { headers,withCredentials: true  });
  }

  // PUT method (for updating data)
  put(endpoint: string, data: any, headers?: HttpHeaders): Observable<any> {
    return this._http.put(`${this.apiUrl}/${endpoint}`, data, { headers,withCredentials: true  });
  }

  // DELETE method
  delete(endpoint: string, headers?: HttpHeaders): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${endpoint}`, { headers,withCredentials: true  });
  }
  
}
