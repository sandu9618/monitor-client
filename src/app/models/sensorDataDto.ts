export class SensorDataDto{
  sensorId: string;
  date: Date;
  value: string;

  constructor(sensorId: string, date: Date, value: string){
    this.sensorId = sensorId;
    this.date = date;
    this.value = value;
  }
}
