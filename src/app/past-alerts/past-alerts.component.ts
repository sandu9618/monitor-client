import { Component, OnInit } from '@angular/core';
import {AlertServiceService} from '../servicecs/alert-service/alert-service.service';
import {AlertDto} from '../models/alert-dto';

@Component({
  selector: 'app-past-alerts',
  templateUrl: './past-alerts.component.html',
  styleUrls: ['./past-alerts.component.css']
})
export class PastAlertsComponent implements OnInit {

  constructor(private alertService: AlertServiceService) { }

  public pastAlerts: AlertDto[] = [];

  ngOnInit(): void {
    this.alertService.getPastAlerts().
      subscribe((data: any) => {
        console.log(data);
        this.pastAlerts = data.body;
    });
  }

}
