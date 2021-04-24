import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../servicecs/web-socket/web-socket.service';
import {SensorDataDto} from '../models/sensorDataDto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  ngOnInit(): void {
  }

  // sensorData: SensorDataDto[];
  //
  // constructor(private webSocketService: WebSocketService) { }
  //
  // ngOnInit(): void {
  //   this.webSocketService.getSensorData().subscribe(sensorData => {
  //     this.sensorData = sensorData;
  //   });
  // }

}
