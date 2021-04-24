import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestRestrctedComponent} from './test-restrcted/test-restrcted.component';
import {KeycloakGuard} from './keycloak.guard.guard';

const routes: Routes = [
  {
    path: 'test', component: TestRestrctedComponent, canActivate: [KeycloakGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
