import React from 'react'
import { useKeycloak } from '@react-keycloak/web';
import { Navigate, useLocation } from 'react-router-dom';

function Login() {
    const { keycloak } = useKeycloak();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: '/' } };
    if (keycloak?.authenticated) {
        return <Navigate to={from}/>
    }else{
        keycloak?.login();
        return <div>Redirecting...</div>
    }
}

export default Login