import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from './servicecs/web-socket/web-socket.service';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'monitor-client';

  constructor(public webSocketService: WebSocketService,  protected keycloakAngular: KeycloakService) { }

  ngOnInit(): void {
    this.keycloakAngular.isLoggedIn().then(r => {
      if (r){
        this.webSocketService.openWebSocket();
      }
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.keycloakAngular.logout();
  }
}
