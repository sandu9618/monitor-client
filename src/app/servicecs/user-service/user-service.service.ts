import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserDto} from '../../models/user-dto';

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

}
