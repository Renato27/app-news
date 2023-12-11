import React, { useEffect, useState } from 'react'
import CardItem from './CardItem'
import './CardsProvider.css'
import { NewsAuthor, NewsCategory, NewsSource, ResponseNews } from '../types/types';
import UserFilters from './UserFilters';
import ArticleSearchFilter from './ArticleSearchFilter';

interface CardsProviderProps {
	responseNews: ResponseNews;
	categories: NewsCategory[];
	sources: NewsSource[];
	authors: NewsAuthor[];
}


function CardsProvider({ responseNews,
	categories,
	sources,
	authors, }: CardsProviderProps) {
	const [news, setNews] = useState(responseNews?.data || []);
	const [links, setLinks] = useState(responseNews?.links || []);
	const [meta, setMeta] = useState(responseNews?.meta || []);
	
	const getNews = async (pageUrl: string) => {
		try {
			const response = await fetch(pageUrl);
			const result = await response.json();
			setNews(result.data);
			setLinks(result.links);
			setMeta(result.meta);
		} catch (error) {
			console.error('Erro ao obter dados da API:', error);
		}
	};

	useEffect(() => {
		setNews(responseNews?.data || []);
		setLinks(responseNews?.links || []);
		setMeta(responseNews?.meta || []);
	}, [responseNews]);

	const handleNextPage = () => {
		if (links?.next) {
			const nextPage = links.next;
			getNews(nextPage);
		}
	};

	const handlePrevPage = () => {
		if (links?.prev) {
			const prevPage = links.prev;
			getNews(prevPage);
		}
	};
	return (
		<div className='cards'>
			<ArticleSearchFilter categories={categories} sources={sources} authors={authors}/>
			<h1>{news[0]?.provider} News</h1>
			<div className='cards__container'>
				<div className='cards__wrapper'>
					<ul className='cards__items'>
						{
							news && news.map((newsItem, index) => {
								const image = newsItem?.image_url ? newsItem?.image_url : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
								return (
									<CardItem key={index} src={image as string} text={newsItem?.description ?? "With no Description"} label={newsItem?.article_title as string} path={newsItem?.url as string} blank/>
								)
							})
						}
					</ul>
					<div className='pagination'>
						<button onClick={handlePrevPage} disabled={!links?.prev}>
							Previous Page
						</button>
						<span>Page {meta.current_page} of {meta.last_page}</span>
						<button onClick={handleNextPage} disabled={!links?.next}>
							Next Page
						</button>
					</div>
				</div>
			</div>
		</div>
	);

}

export default CardsProvider