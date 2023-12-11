import React, { useEffect, useState } from 'react'
import { useKeycloak } from '@react-keycloak/web';
import { ProviderItem } from './types/types';
import Home from './components/pages/Home';
import ProviderDetails from './components/pages/ProviderDetails';
import SignUp from './components/pages/SignUp';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Layout from './components/Layout';
import Logout from './components/Logout';
import { keycloak } from './utils/auth';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function AppRoutes() {
    const [providerItens, setProviderItens] = useState<ProviderItem[]>([]);
    const keycloak = useKeycloak();
    const { initialized } = keycloak;
    console.log('keycloak', keycloak.keycloak.token);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${backendUrl}/provider`);
          const result = await response.json();
          setProviderItens(result.data);
        } catch (error) {
          console.error('Erro ao obter dados da API:', error);
        }
      };
  
      fetchData();
    }, [initialized]);

    if (!initialized) {
        return <div>Loading...</div>;
    }

    const routes = [
        {
            path: "/",
            element: <PrivateRoute element={<Layout>{<Home />}</Layout>} path="/" />,
            loader: async () => {
                return providerItens
             },
        },
        {
            path: "/provider/:providerId",
            element: <PrivateRoute element={<Layout>{<ProviderDetails />}</Layout>} path="/provider/:providerId" />,
            loader: async () => {
                return providerItens
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