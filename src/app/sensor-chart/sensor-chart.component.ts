import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../servicecs/web-socket/web-socket.service';
import {SensorDataDto} from '../models/sensorDataDto';

@Component({
  selector: 'app-chart-sensor',
  templateUrl: './sensor-chart.component.html',
  styleUrls: ['./sensor-chart.component.css']
})
export class SensorChartComponent implements OnInit {


  sensorData: SensorDataDto[] = [];

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.getSensorData().subscribe(sensorData => {
      this.sensorData = sensorData;
    });
  }

}
