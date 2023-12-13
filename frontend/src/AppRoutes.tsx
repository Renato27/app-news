import React, { useEffect, useState } from 'react'
import { useKeycloak } from '@react-keycloak/web';
import Home from './components/pages/Home';
import ProviderDetails from './components/pages/ProviderDetails';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Layout from './components/Layout';
import { getProviders } from './utils/api';
import './components/Loading.css'

function AppRoutes() {
    const [token, setToken] = useState('');
    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
      const fetchData = async () => {
        try {
            if (initialized) {
                const token = keycloak.token as string;
                setToken(token);
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
      };
  
      fetchData();
    }, [initialized, keycloak.token, setToken]);

    if (!initialized) {
        return <div className="loading-overlay">
            <i className="loading-icon fas fa-spinner fa-spin"></i>
        </div>
    }

    const routes = [
        {
            path: "/",
            element: <PrivateRoute element={<Layout>{<Home />}</Layout>} path="/" />,
            loader: async () => {
                return await getProviders(token) ?? []
             },
        },
        {
            path: "/provider/:providerId",
            element: <PrivateRoute element={<Layout>{<ProviderDetails />}</Layout>} path="/provider/:providerId" />,
            loader: async () => {
                return await getProviders(token) ?? []
             },
        },
        {
            path: "/logout",
            loader: async () => {
                return keycloak?.logout();
             },
        },
        {
            path: "/login",
            element: <Login />,
            
        }
    ];

    return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default AppRoutes