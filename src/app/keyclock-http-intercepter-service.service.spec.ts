import { TestBed } from '@angular/core/testing';

import { KeycloakHttpInterceptorServiceService } from './keycloak-http-interceptor-service.service';

describe('KeyclockHttpIntercepterServiceService', () => {
  let service: KeycloakHttpInterceptorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakHttpInterceptorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
