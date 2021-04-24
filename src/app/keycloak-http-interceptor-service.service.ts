import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';



@Injectable({
  providedIn: 'root'
})
export class KeycloakHttpInterceptorServiceService implements HttpInterceptor{

  constructor(protected keycloakAngular: KeycloakService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('pppppppppppppppppppppppppppppppppppppppppppppppppppppp');
    console.log(this.keycloakAngular.getKeycloakInstance().token);

    const authrequest = req.clone({
      headers: req.headers.set('authorization', 'Bearer ' )
    });

    return next.handle(authrequest);
  }
}
