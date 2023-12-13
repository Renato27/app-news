import React, { useEffect } from 'react'
import { useKeycloak } from '@react-keycloak/web';
import Home from './components/pages/Home';
import ProviderDetails from './components/pages/ProviderDetails';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Layout from './components/Layout';
import { getProviders } from './utils/api';
import { useAuth } from './components/AuthContext';

function AppRoutes() {
    const {token, setAuthToken} = useAuth();
    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
      const fetchData = async () => {
        try {
            if (initialized) {
                const token = keycloak.token;
                setAuthToken(token);
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
      };
  
      fetchData();
    }, [initialized, keycloak.token, setAuthToken]);

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
            // element: <Logout />,
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