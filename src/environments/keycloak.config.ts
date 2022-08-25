import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:7688',
  realm: 'myrealm',
  clientId: 'myclient',
};

export default keycloakConfig;
