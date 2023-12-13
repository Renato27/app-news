import Keycloak from "keycloak-js";

type KeycloakConfig = {
    "auth-server-url": string;
    realm: string;
    resource: string;
};

export const keycloakConfig: KeycloakConfig = JSON.parse(process.env.REACT_APP_KEYCLOAK_JSON as string);
export const keycloak = new Keycloak({
    url: keycloakConfig["auth-server-url"],
    realm: keycloakConfig.realm,
    clientId: keycloakConfig.resource,
});

export const keycloakProviderInitConfig = {
    onLoad: "check-sso",
}


export const getKeycloakInstance = () => {
    
    keycloak.init({
      onLoad: 'check-sso'
    });
  
    return keycloak;
  };