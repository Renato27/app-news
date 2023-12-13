import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ProviderItem } from '../../types/types';
import CardsProvider from '../CardsProvider';
import HeaderSection from '../HeaderSection';
import { getProvider } from '../../utils/api';
import { useKeycloak } from '@react-keycloak/web';
import './ProviderDetails.css'

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const backendUrlReplaced = backendUrl?.replace('/api', '');

function ProviderDetails() {
	const { keycloak } = useKeycloak();
	const token = keycloak.token;	
	const { providerId } = useParams();
	const [loading, setLoading] = useState<boolean>(true);
	const [provider, setProvider] = useState<ProviderItem>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [providerData] =
					await Promise.all([
						getProvider(token, providerId),
					]);
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
			<HeaderSection providerImg={`${backendUrlReplaced}/${provider?.image_url}`} />
			{provider ?
				<>
					<CardsProvider token={token} provider={provider} />
				</> :
				<div className="loading-overlay">
					<i className="loading-icon fas fa-spinner fa-spin"></i>
				</div>
			}
		</>
	)
}

export default ProviderDetails