import React from 'react';
import '../../App.css';
import HeaderSection from '../HeaderSection';
import { ProviderItem } from '../../types/types';
import CardsHome from '../CardsHome';
import { useLoaderData } from 'react-router-dom';

function Home() {
  const providerItens = useLoaderData() as ProviderItem[]
  return (
    <>
      <HeaderSection providerImg=''/>
      <CardsHome providerItens={providerItens}/>
    </>
  )
}

export default Home