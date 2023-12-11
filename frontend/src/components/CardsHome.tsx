import React from 'react'
import CardItem from './CardItem'
import './CardsHome.css'
import { NewsItem } from '../types/types';


function CardsHome({ newsItem }: { newsItem: NewsItem[] }) {

    return (
        <div className='cards'>
            <h1>Check our News through the platforms below</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {
                            newsItem && newsItem.map((newsItem, index) => {
                                console.log(newsItem)
                                const image = newsItem?.base64Logo ? newsItem?.base64Logo : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
                                return (
                                    <CardItem key={index} src={image} text={newsItem?.webName as string} label={newsItem?.webName as string} path={`/provider/${newsItem.id}`} blank={false}/>
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