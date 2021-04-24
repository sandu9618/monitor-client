import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SensorDataDto} from '../models/sensorDataDto';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit, OnChanges{

  @Input() items: SensorDataDto[];

  public primaryXAxis: Object;
  public chartData: Object[] = [];
  public title: string;
  public primaryYAxis: Object;

  // private chartMap: Map<Date, string> = new Map<Date, string>();


  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    changes.items.currentValue.forEach( (item: SensorDataDto) => {
        // console.log(item);
        const val: number = parseInt(item.value.substring(0, (item.value.length - 1)));
        // console.log(val);
        // const day = item.date.getUTCDay();
        // const month = item.date.getMonth();
        // const year = item.date.getFullYear();
        console.log(typeof item.date);
        const date = new Date();
        console.log('date: ' + date);
        this.chartData.push({x: item.date, y: val});
      }
    );

    console.log(this.chartData);

    const chartD = [
      { x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
      { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
      { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
    ];

    console.log(chartD);
  }

  ngOnInit(): void {


    // this.chartData = [
    //   { x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
    //   { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
    //   { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
    // ];
    this.primaryXAxis = {
      valueType: 'DateTime',
      title: 'Sales Across Years',
      labelFormat: 'hms'
    };
    this.primaryYAxis = {
      title: 'Sales Amount in millions(USD)'
    };
    this.title = 'Average Sales Comparison';

    console.log(this.items + 'xxxxxxxxxxxxxxxxxxx');
  }


}
