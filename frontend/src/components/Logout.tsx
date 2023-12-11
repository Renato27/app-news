import React from 'react'
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';

function Logout() {
    const { keycloak } = useKeycloak();
    
    keycloak?.logout();
        
    return <Navigate to="/"/>
}

export default Logout