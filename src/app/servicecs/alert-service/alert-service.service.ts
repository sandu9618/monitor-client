import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  private apiUrl = 'http://localhost:8095/alert';
  constructor(private http: HttpClient) { }

  public  getPastAlerts(): Observable<any>{
    return this.http.get(`${this.apiUrl}/user?user=' + 'chamil'`);
  }
}
