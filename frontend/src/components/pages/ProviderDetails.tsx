import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { NewsAuthor, NewsCategory, NewsSource, ProviderItem, ResponseNews } from '../../types/types';
import CardsProvider from '../CardsProvider';
import HeaderSection from '../HeaderSection';
import { getAuthors, getCategories, getNews, getProvider, getSources } from '../../utils/api';
import { useKeycloak } from '@react-keycloak/web';
import './ProviderDetails.css'

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const backendUrlReplaced = backendUrl?.replace('/api', '');

function ProviderDetails() {
	const { keycloak } = useKeycloak();
	const token = keycloak.token;
	const { providerId } = useParams();
	const [loading, setLoading] = useState<boolean>(true);
	const [news, setNews] = useState<ResponseNews>();
	const [categories, setCategories] = useState<NewsCategory[]>([]);
	const [sources, setSources] = useState<NewsSource[]>([]);
	const [authors, setAuthors] = useState<NewsAuthor[]>([]);
	const [provider, setProvider] = useState<ProviderItem>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [newsData, categoriesData, sourcesData, authorsData, providerData] =
					await Promise.all([
						getNews(token, providerId),
						getCategories(token, providerId),
						getSources(token, providerId),
						getAuthors(token, providerId),
						getProvider(token, providerId),
					]);

				setNews(newsData);
				setCategories(categoriesData);
				setSources(sourcesData);
				setAuthors(authorsData);
				setProvider(providerData);
			} catch (error) {
				console.error('Erro ao buscar dados:', error);
			}
			finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [providerId, token]);

	return (
		<>
			{loading && (
				<div className="loading-overlay">
					<i className="loading-icon fas fa-spinner fa-spin"></i>
				</div>
			)}
			{!loading && (
				<>
					<HeaderSection providerImg={`${backendUrlReplaced}/${provider?.base64Logo}`} />
					{news && Array.isArray(categories) && Array.isArray(sources) && Array.isArray(authors) ?
						<>
							<CardsProvider responseNews={news} categories={categories} sources={sources} authors={authors} />
						</> :
						<div className="loading-overlay">
							<i className="loading-icon fas fa-spinner fa-spin"></i>
						</div>
					}
				</>
			)
			}
		</>
	)
}

export default ProviderDetails