import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';
import { WebSocketService } from './servicecs/web-socket/web-socket.service';
import {UserServiceService} from './servicecs/user-service/user-service.service';
import {UserDto} from './models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class KeycloakGuard extends KeycloakAuthGuard {


  constructor(
    protected  router: Router,
    protected keycloakAngular: KeycloakService,
    private webSocketService: WebSocketService,
    private userServiceService: UserServiceService
    ) {
    super(router, keycloakAngular);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    if (!this.authenticated) {
      const res = await this.keycloakAngular.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    const userName = this.keycloakAngular.getUsername();
    sessionStorage.setItem('loggedUserName', userName);
    // this.webSocketService.openWebSocket();

    await this.keycloakAngular.loadUserProfile().then(r => {
      console.log(r.createdTimestamp);
      this.userServiceService.save(new UserDto(r.username as string, r.username as string, r.email as string, '077151515'));
    });

    const requiredRoles = route.data.roles;

    if (!(requiredRoles instanceof  Array) || requiredRoles.length === 0) {
      return true;
    }

    return requiredRoles.every((role) => this.roles.includes(role));
  }

}
