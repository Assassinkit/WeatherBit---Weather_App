import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KylientWeatherWidgetComponent } from './kylient-weather-widget.component';

describe('KylientWeatherWidgetComponent', () => {
  let component: KylientWeatherWidgetComponent;
  let fixture: ComponentFixture<KylientWeatherWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KylientWeatherWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KylientWeatherWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
