import {Component, Inject, NgZone, OnInit, PLATFORM_ID} from '@angular/core';


import io from 'socket.io-client';
import {environment} from '../../environments/environment';
import {Chart} from "chart.js";
import {WebSocketService} from "../servicecs/web-socket/web-socket.service";
import {SensorDataDto} from "../models/sensor-data-dto";
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {isPlatformBrowser} from "@angular/common";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


const socket = io(environment.socketUrl + sessionStorage.getItem('loggedUserName'));


@Component({
  selector: 'app-chart-test',
  templateUrl: './chart-test.component.html',
  styleUrls: ['./chart-test.component.css']
})
export class ChartTestComponent implements OnInit {

  public chartValues = [];
  public messages = [];
  public min: Date = new Date();
  public max: Date = new Date(this.min.getTime() + 20000);

  private chart: am4charts.XYChart;
  sensorData: SensorDataDto[] = [];
  browserOnly(f: () => void): any{
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone, private wsService: WebSocketService) {
    wsService.createObservableSocket()
      .subscribe(m => {
        const item: any = JSON.parse(m);
        const temp = item;
        const sensorDataDto: SensorDataDto = {
          sensorId : temp.sensorId,
          date: new Date(temp.date.year, temp.date.monthValue, temp.date.dayOfMonth, temp.date.hour, temp.date.minute, temp.date.second),
          // tslint:disable-next-line:radix
          value: temp.value.substring(0, (temp.value.length - 1)),
        };
        if (item.value){
          // this.chart.data.push(sensorDataDto);
          this.chart.data = [...this.chart.data, sensorDataDto];
        }



        // item.time = new Date(item.time);
        // if (item.value) {
        //   // @ts-ignore
        //   this.chartValues = [...this.chartValues, item];
        //   console.log(this.chartValues);
        //   if (this.chartValues.length > 20) {
        //     // @ts-ignore
        //     this.min = this.chartValues[this.chartValues.length - 20].time;
        //     this.max = item.time;
        //   }
        // } else {
        //   // @ts-ignore
        //   this.messages = [...this.messages, item];
        // }
      });
  }

  ngOnInit(): void {
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create('statestics-chart', am4charts.XYChart);
    chart.paddingRight = 20;
    chart.data = this.sensorData;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.dateFormats.setKey('hour', 'HH:mm');

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 70;
    valueAxis.min = 0;
    valueAxis.max = 100;

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'value';
    series.tooltipText = '{valueY.value}';

    chart.cursor = new am4charts.XYCursor();

    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }
}
