import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorChartComponent } from './sensor-chart.component';

describe('ChartComponent', () => {
  let component: SensorChartComponent;
  let fixture: ComponentFixture<SensorChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
