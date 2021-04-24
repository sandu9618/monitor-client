import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SensorDataDto} from '../../models/sensorDataDto';

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
      // console.log(event);
      const sensorDataDto = JSON.parse(event.data);
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
