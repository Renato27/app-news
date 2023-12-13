import React, { useEffect, useState } from 'react'
import CardItem from './CardItem'
import './CardsProvider.css'
import { LinkNews, MetaNews, NewsAuthor, NewsCategory, NewsItemData, NewsSource, ProviderItem, ResponseNews, UserSetting } from '../types/types';
import ArticleSearchFilter from './ArticleSearchFilter';
import { getAuthors, getCategories, getNews, getNewsByUserSettings, getNewsPerPage, getSources } from '../utils/api';


function CardsProvider({ token, provider }: { token: string | undefined, provider: ProviderItem | undefined }) {
	const [loading, setLoading] = useState<boolean>(true);
	const [news, setNews] = useState<NewsItemData[]>();
	const [userSettingsFound, setUserSettingsFound] = useState<UserSetting>();
	const [resultNews, setResultNews] = useState<ResponseNews>();
	const [categories, setCategories] = useState<NewsCategory[]>([]);
	const [sources, setSources] = useState<NewsSource[]>([]);
	const [authors, setAuthors] = useState<NewsAuthor[]>([]);
	const [links, setLinks] = useState<LinkNews>();
	const [meta, setMeta] = useState<MetaNews>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const providerId = String(provider?.id);
				setLoading(true);
				const [newsData, categoriesData, sourcesData, authorsData] =
					await Promise.all([
						getNewsByUserSettings(token, providerId),
						getCategories(token, providerId),
						getSources(token, providerId),
						getAuthors(token, providerId),
					]);

				if (newsData.data.length === 0) {
					const news = await getNews(token, providerId);
					setResultNews(news);
				}
				else {
					setUserSettingsFound(newsData.data[0].user_setting)
					setResultNews(newsData);
				}

				setCategories(categoriesData);
				setSources(sourcesData);
				setAuthors(authorsData);
			} catch (error) {
				console.error('Erro ao buscar dados:', error);
			}
			finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [provider, token]);

	useEffect(() => {
		setNews(resultNews?.data)
		setLinks(resultNews?.links);
		setMeta(resultNews?.meta);
		setUserSettingsFound(resultNews?.data[0]?.user_setting)
	}, [resultNews])

	const handleNextPage = async () => {
		if (links?.next) {
			const nextPage = links.next;
			const news = await getNewsPerPage(token, nextPage);
			setNews(news.data);
			setLinks(news.links);
			setMeta(news.meta);
		}
	};

	const handlePrevPage = async () => {
		if (links?.prev) {
			const prevPage = links.prev;
			const news = await getNewsPerPage(token, prevPage);
			setNews(news.data);
			setLinks(news.links);
			setMeta(news.meta);
		}
	};
	console.log('news', news)
	return (
		<div className='cards'>
			<ArticleSearchFilter categories={categories} sources={sources} authors={authors} provider={provider} userSettingsFound={userSettingsFound} setResultNews={setResultNews} />
			<h1>{provider?.web_name} News</h1>
			{userSettingsFound && <h2>News found by your settings</h2>}
			<div className='cards__container'>
				{loading && (
					<div className="loading-overlay">
						<i className="loading-icon fas fa-spinner fa-spin"></i>
					</div>
				)}
				{!loading && (
					<>
						<div className='cards__wrapper'>
							{news?.length !== undefined && news?.length > 0 ? (
								<ul className='cards__items'>
									{
										news.map((newsItem, index) => {
											const image = newsItem?.image_url ? newsItem?.image_url : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
											return (
												<CardItem key={index} src={image as string} text={newsItem?.description ?? "With no Description"} label={newsItem?.article_title as string} path={newsItem?.url as string} blank />
											)
										})
									}
								</ul>
							) : (
								<div className="no-results-message">
									<p>Search not entered.</p>
								</div>
							)

							}

							<div className='pagination'>
								<button onClick={handlePrevPage} disabled={!links?.prev}>
									Previous Page
								</button>
								<span>Page {meta?.current_page} of {meta?.last_page}</span>
								<button onClick={handleNextPage} disabled={!links?.next}>
									Next Page
								</button>
							</div>
						</div>
					</>
				)
				}
			</div>

		</div>
	);

}

export default CardsProvider