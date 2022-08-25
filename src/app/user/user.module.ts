import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from './keycloak-initializer';

@NgModule({
  declarations: [],
  imports: [CommonModule, KeycloakAngularModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService],
    },
  ],
})
export class UserModule {}
