import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserDto} from '../../models/user-dto';
import {Observable, Subject} from 'rxjs';
import {Sensor} from '../../models/sensor';
import {SensorDataDto} from '../../models/sensor-data-dto';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  private sensors = new Subject<Sensor[]>();


  private headers =  new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  });

  private apiUrl = environment.apiRrl + 'user';
  constructor(private http: HttpClient) { }

  public  save(userDto: UserDto): void{
    this.http.post(this.apiUrl + '/save', userDto, {headers: this.headers}).subscribe( r => {
      console.log(r);
    });
  }

  public getSensors(): Observable<Sensor[]>{
     this.http.get<{status: boolean, message: string; body: Sensor[] }>
    (this.apiUrl + '/' + sessionStorage.getItem('loggedUserName') + '/sensors' ).subscribe(r => {
      this.sensors.next([...r.body]);
    });
     return this.sensors.asObservable();
  }

  // tslint:disable-next-line:variable-name
  public selectSensors(sensorId_: string): void{
    const  ps = sessionStorage.getItem('selectedSensor');
    this.http.post(this.apiUrl + '/select-sensor' , {
      userId: sessionStorage.getItem('loggedUserName'),
      sensorId: sensorId_,
      previousSensorId: ps != null ? ps : -1
    }).subscribe(res => {
      console.log(res);
      sessionStorage.setItem('selectedSensor', sensorId_);
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
