import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastAlertsComponent } from './past-alerts.component';

describe('PastAlertsComponent', () => {
  let component: PastAlertsComponent;
  let fixture: ComponentFixture<PastAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
