import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserDto} from '../../models/user-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private headers =  new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  });

  private apiUrl = 'http://localhost:8095/user';
  constructor(private http: HttpClient) { }

  public  save(userDto: UserDto): void{
    this.http.post(this.apiUrl + '/save', userDto, {headers: this.headers}).subscribe( r => {
      console.log(r);
    });
  }

  public getUserNotificationTypes(): Observable<any>{
    let username = sessionStorage.getItem('loggedInUser') ? sessionStorage.getItem('loggedInUser') : 'milan';
    return this.http.get<any>(this.apiUrl + '/' + username + '/notifiers', {headers: this.headers});
  }

  public updateUserNotificationTypes(notifierTypes: string[]): Observable<any>{
    let username = sessionStorage.getItem('loggedInUser') ? sessionStorage.getItem('loggedInUser') : 'milan';
    return this.http.put<any>(this.apiUrl + '/' + username + '/notifiers', notifierTypes, {headers: this.headers});
  }
}
