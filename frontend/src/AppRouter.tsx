import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/pages/Home'
import SignUp from './components/pages/SignUp'
import ProviderDetails from './components/pages/ProviderDetails'
import { ProviderItem } from './types/types'
import Footer from './components/Footer'
import './App.css';
import { useKeycloak } from '@react-keycloak/web';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function AppRouter() {
  const { initialized } = useKeycloak();
  const [news, setNews] = useState<ProviderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/provider`);
        const result = await response.json();
        setNews(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <>
        <Navbar  providerItens={news}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/provider/:providerId" element={<ProviderDetails />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
        <Footer />
      </>
    </Router>
  )
}

export default AppRouter