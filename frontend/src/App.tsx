import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import { NewsItem } from './types/types';
import SignUp from './components/pages/SignUp';
import ProviderDetails from './components/pages/ProviderDetails';
import HeaderSection from './components/HeaderSection';
import Footer from './components/Footer';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/news`);
        const result = await response.json();
        setNews(result);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Router>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
          <Navbar newsItem={news} />
            <Routes>
              <Route path='/' element={<Home newsItem={news} />} />
              <Route path="/provider/:providerId" element={<ProviderDetails />} />
              <Route path='/sign-up' element={<SignUp />} />
            </Routes>
          <Footer />
          </>
        )}

      </Router>
    </>
  );
}

export default App;
