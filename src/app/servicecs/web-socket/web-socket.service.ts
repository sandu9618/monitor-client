import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SensorDataDto} from '../../models/sensor-data-dto';
import DateTimeFormat = Intl.DateTimeFormat;
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  // @ts-ignore
  private webSocket: WebSocket;
  private sensorData: SensorDataDto[] = [];
  private sensorDataUpdated = new Subject<SensorDataDto[]>();

  constructor() {

  }

  public ws: WebSocket;
  public createObservableSocket(): Observable<string> {
    const socketUrl = environment.socketUrl;
    const loggedUserName = sessionStorage.getItem('loggedUserName');
    this.ws = new WebSocket(socketUrl + loggedUserName);

    return Observable.create((observer: { next: (arg0: any) => any; error: (arg0: Event) => any; complete: () => any; }) => {
      this.ws.onmessage = event => observer.next(event.data);
      this.ws.onerror = event => observer.error(event);
      this.ws.onclose = event => observer.complete();
    });
  }

  // public sendMessage(message: any): void {
  //   this.ws.send(message);
  // }

  // tslint:disable-next-line:typedef
  public openWebSocket(){
    console.log('openWebSocket');
    const socketUrl = environment.socketUrl;
    const loggedUserName = sessionStorage.getItem('loggedUserName');
    this.webSocket = new WebSocket(socketUrl + loggedUserName);

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {

      const temp = JSON.parse(event.data);
      const sensorDataDto: SensorDataDto = {
        sensorId : temp.sensorId,
        date: new Date(temp.date.year, temp.date.monthValue, temp.date.dayOfMonth, temp.date.hour, temp.date.minute, temp.date.second),
        value: temp.value,
      };
      console.log(sensorDataDto);

      this.sensorData.push(sensorDataDto);
      this.sensorDataUpdated.next([...this.sensorData]);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  // tslint:disable-next-line:typedef
  public getSensorData(){
    return this.sensorDataUpdated.asObservable();
  }


  // tslint:disable-next-line:typedef
  public closeWebSocket() {
    this.webSocket.close();
  }
}
