import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SensorDataDto} from '../../models/sensor-data-dto';
import DateTimeFormat = Intl.DateTimeFormat;

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

  // tslint:disable-next-line:typedef
  public openWebSocket(){
    console.log('openWebSocket');

    const loggedUserName = sessionStorage.getItem('loggedUserName');
    this.webSocket = new WebSocket('ws://localhost:8095/chat?user=' + loggedUserName);

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log(event);

      let temp = JSON.parse(event.data);
      let sensorDataDto: SensorDataDto = {
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
