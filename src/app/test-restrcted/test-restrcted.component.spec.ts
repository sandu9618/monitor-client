import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRestrctedComponent } from './test-restrcted.component';

describe('TestRestrctedComponent', () => {
  let component: TestRestrctedComponent;
  let fixture: ComponentFixture<TestRestrctedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRestrctedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRestrctedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
