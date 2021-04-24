import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SensorDataDto} from '../../models/sensorDataDto';
import DateTimeFormat = Intl.DateTimeFormat;

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private webSocket: WebSocket;
  private sensorData: SensorDataDto[] = [];
  private sensorDataUpdated = new Subject<SensorDataDto[]>();

  constructor() {

  }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:8080/chat?user=client');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {

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

  public getSensorData(){
    return this.sensorDataUpdated.asObservable();
  }


  public closeWebSocket() {
    this.webSocket.close();
  }
}
