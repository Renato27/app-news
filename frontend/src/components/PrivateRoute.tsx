import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate, useLocation } from 'react-router-dom';
import './Loading.css'

const PrivateRoute: React.FC<{ element: React.ReactNode; path: string }> = ({ element, path }) => {
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();

  if (!initialized) {
    return <div className="loading-overlay">
      <i className="loading-icon fas fa-spinner fa-spin"></i>
    </div>;
  }

  if (!keycloak.authenticated) {
    return <Navigate to="/login" state={location} />;
  }

  return <>{element}</>;
};

export default PrivateRoute;