import React from 'react';
import './utils/auth'
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { keycloak, keycloakProviderInitConfig } from './utils/auth';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
      <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakProviderInitConfig}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ReactKeycloakProvider>
  );
}

export default App;
