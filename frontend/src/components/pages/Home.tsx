import React from 'react';
import '../../App.css';
import HeaderSection from '../HeaderSection';
import Footer from '../Footer';
import { NewsItem } from '../../types/types';
import CardsHome from '../CardsHome';

function Home({ newsItem }: { newsItem: NewsItem[] }) {
  return (
    <>
      <HeaderSection />
      <CardsHome newsItem={newsItem}/>
    </>
  )
}

export default Home