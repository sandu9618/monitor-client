import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class KeycloakGuard extends KeycloakAuthGuard {


  constructor(protected  router: Router, protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    // console.log(this);

    if (!this.authenticated) {

      await this.keycloakAngular.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    const requiredRoles = route.data.roles;

    if (!(requiredRoles instanceof  Array) || requiredRoles.length === 0) {
      return true;
    }

    return requiredRoles.every((role) => this.roles.includes(role));
  }

}
