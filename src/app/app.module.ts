import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestRestrctedComponent } from './test-restrcted/test-restrcted.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {KeycloakHttpInterceptorServiceService} from './keycloak-http-interceptor-service.service';
import { SensorChartComponent } from './sensor-chart/sensor-chart.component';
import { LineComponent } from './line/line.component';
import {ChartModule, DateTimeCategoryService, DateTimeService, LineSeriesService, StripLineService} from '@syncfusion/ej2-angular-charts';
import { ChartComponent } from './chart/chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PastAlertsComponent } from './past-alerts/past-alerts.component';
import { SensorComponent } from './sensor/sensor.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartTestComponent } from './chart-test/chart-test.component';


// tslint:disable-next-line:typedef
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        // url: 'http://4093c00f3ebc.ngrok.io/auth',
        url: 'http://localhost:8080/auth',
        realm: 'SoftwareArchitecture',
        clientId: 'client_app',
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: true,
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      },
      enableBearerInterceptor: true,
      loadUserProfileAtStartUp: true
    });
}


@NgModule({
  declarations: [
    AppComponent,
    TestRestrctedComponent,
    SensorChartComponent,
    LineComponent,
    ChartComponent,
    DashboardComponent,
    PastAlertsComponent,
    SensorComponent,
    SettingsComponent,
    ChartTestComponent,
  ],
  imports: [
    AppRoutingModule, BrowserModule, KeycloakAngularModule, ChartModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [

   // { provide: APP_INITIALIZER, useFactory: initializeKeycloak, multi: true, deps: [KeycloakService]},
   // { provide: HTTP_INTERCEPTORS, useClass: KeycloakHttpInterceptorServiceService, multi: true },
    // DateTimeService, LineSeriesService, DateTimeCategoryService, StripLineService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
