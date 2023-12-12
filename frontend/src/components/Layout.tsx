// Layout.tsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLoaderData } from 'react-router-dom';
import { ProviderItem } from '../types/types';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const providerItens = useLoaderData() as ProviderItem[]

    return (
        <>
            <Navbar providerItens={providerItens} />
            <div>
                {children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;
