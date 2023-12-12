import React, { useEffect } from 'react'
import { useKeycloak } from '@react-keycloak/web';
import Home from './components/pages/Home';
import ProviderDetails from './components/pages/ProviderDetails';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Layout from './components/Layout';
import Logout from './components/Logout';
import { getProviders } from './utils/api';
import { useAuth } from './components/AuthContext';

function AppRoutes() {
    const {token, setAuthToken} = useAuth();
    const keycloak = useKeycloak();
    const { initialized } = keycloak;
    useEffect(() => {
      const fetchData = async () => {
        try {
            if (initialized) {
                const token = keycloak.keycloak.token;
                setAuthToken(token);
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
      };
  
      fetchData();
    }, [initialized, keycloak.keycloak.token, setAuthToken]);

    if (!initialized) {
        return <div>Loading...</div>;
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
            element: <Logout />,
        },
        {
            path: "/login",
            element: <Login />,
        }
    ];

    return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default AppRoutes