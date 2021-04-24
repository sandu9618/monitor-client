import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestRestrctedComponent } from './test-restrcted/test-restrcted.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {KeycloakHttpInterceptorServiceService} from './keycloak-http-interceptor-service.service';
import { ChartComponent } from './chart/chart.component';

// tslint:disable-next-line:typedef
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'heroes',
        clientId: 'spa-heroes-backend',
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
    ChartComponent
  ],
  imports: [
    AppRoutingModule, BrowserModule, KeycloakAngularModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: KeycloakHttpInterceptorServiceService, multi: true },
    // { provide: APP_INITIALIZER, useFactory: initializeKeycloak, multi: true, deps: [KeycloakService]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
