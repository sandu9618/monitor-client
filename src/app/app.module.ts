import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestRestrctedComponent } from './test-restrcted/test-restrcted.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {KeycloakHttpInterceptorServiceService} from './keycloak-http-interceptor-service.service';
import { ChartComponent } from './chart/chart.component';
import { LineComponent } from './line/line.component';
import {ChartModule, DateTimeCategoryService, DateTimeService, LineSeriesService, StripLineService} from '@syncfusion/ej2-angular-charts';


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
    ChartComponent,
    LineComponent
  ],
  imports: [
    AppRoutingModule, BrowserModule, KeycloakAngularModule, ChartModule, HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: KeycloakHttpInterceptorServiceService, multi: true },
    { provide: APP_INITIALIZER, useFactory: initializeKeycloak, multi: true, deps: [KeycloakService]},
    DateTimeService, LineSeriesService, DateTimeCategoryService, StripLineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
