import {Component, Input, OnInit} from '@angular/core';
import {SensorDataDto} from '../models/sensor-data-dto';
import {Sensor} from '../models/sensor';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  @Input() sensor: Sensor;

  constructor() { }

  ngOnInit(): void {
  }

}
