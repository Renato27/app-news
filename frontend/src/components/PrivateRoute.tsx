import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate, useLocation } from 'react-router-dom';


const PrivateRoute: React.FC<{ element: React.ReactNode; path: string }> = ({ element, path }) => {
    const { keycloak, initialized } = useKeycloak();
    const location = useLocation();
  
    if (!initialized) {
      return <div>Loading...</div>;
    }
  
    if (!keycloak.authenticated) {
      return <Navigate to="/login" state={location}/>;
    }
  
    return <>{element}</>;
  };

export default PrivateRoute;