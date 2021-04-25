import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestRestrctedComponent} from './test-restrcted/test-restrcted.component';
import {KeycloakGuard} from './keycloak.guard.guard';
import {PastAlertsComponent} from './past-alerts/past-alerts.component';
import {SettingsComponent} from './settings/settings.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  { path : '', component: DashboardComponent, canActivate: []},
  {path: 'test', component: TestRestrctedComponent, canActivate: []},
  {path: 'history', component: PastAlertsComponent, canActivate: []},
  {path: 'settings', component: SettingsComponent, canActivate: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
