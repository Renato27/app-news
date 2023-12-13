import React from 'react'
import CardItem from './CardItem'
import './CardsHome.css'
import { ProviderItem } from '../types/types';
import { useKeycloak } from '@react-keycloak/web';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function CardsHome({ providerItens }: { providerItens: ProviderItem[] }) {
    const {keycloak} = useKeycloak();
    const username = keycloak?.tokenParsed?.name;
    return (
        <div className='cards'>
            <h1>Welcome {username}</h1>
            <h1>Check our News through the platforms below</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {
                            providerItens && providerItens.map((newsItem, index) => {
                                const backendUrlReplaced = backendUrl?.replace('/api', '');
                                const image = newsItem?.image_url ? `${backendUrlReplaced}/${newsItem?.image_url}` : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
                                return (
                                    <CardItem key={index} src={image} text={newsItem?.web_name as string} label={newsItem?.web_name as string} path={`/provider/${newsItem.id}`} blank={false}/>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );


}

export default CardsHome