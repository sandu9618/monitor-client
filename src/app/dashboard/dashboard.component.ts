import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../servicecs/user-service/user-service.service';
import {Sensor} from '../models/sensor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sensors: Sensor[] = [];
  constructor(private userServiceService: UserServiceService) { }

  ngOnInit(): void {
    this.userServiceService.getSensors().subscribe(sensor => {
      this.sensors = sensor;
    });
  }

  // tslint:disable-next-line:typedef
  onCardClick(sensorId: string) {
    this.userServiceService.selectSensors(sensorId);
  }
}
