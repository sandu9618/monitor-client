import { TestBed } from '@angular/core/testing';

import { Keycloak.GuardGuard } from './keycloak.guard.guard';

describe('Keycloak.GuardGuard', () => {
  let guard: Keycloak.GuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Keycloak.GuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
