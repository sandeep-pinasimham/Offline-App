import { TestBed } from '@angular/core/testing';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { AuthService } from './auth.service';

const MockKeycloakService = {
  getKeycloakInstance: () => ({
    idTokenParsed: 'abc',
    accountManagement: () => {},
  }),
  isLoggedIn: () => true,
  loadUserProfile: () => ({}),
  logout: () => {},
  login: () => {
    return Promise.resolve({});
  },
  getUserRoles: () => {},
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KeycloakAngularModule],
      providers: [{ provide: KeycloakService, useValue: MockKeycloakService }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
