import React from 'react';
import './utils/auth'
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { keycloak, keycloakProviderInitConfig } from './utils/auth';
import AppRoutes from './AppRoutes';

function App() {
  return (
      <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakProviderInitConfig}>
          <AppRoutes />
      </ReactKeycloakProvider>
  );
}

export default App;
