import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestRestrctedComponent} from './test-restrcted/test-restrcted.component';
import {KeycloakGuard} from './keycloak.guard.guard';
import {PastAlertsComponent} from './past-alerts/past-alerts.component';
import {SettingsComponent} from './settings/settings.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  { path : '', component: DashboardComponent},
  {
    path: 'test', component: TestRestrctedComponent, canActivate: [KeycloakGuard]
  },
  {path: 'history', component: PastAlertsComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
