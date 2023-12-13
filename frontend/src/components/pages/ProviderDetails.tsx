import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ProviderItem } from '../../types/types';
import CardsProvider from '../CardsProvider';
import HeaderSection from '../HeaderSection';
import { getProvider } from '../../utils/api';
import { useKeycloak } from '@react-keycloak/web';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const backendUrlReplaced = backendUrl?.replace('/api', '');

function ProviderDetails() {
	const { keycloak } = useKeycloak();
	const token = keycloak.token;	
	const { providerId } = useParams();
	const [provider, setProvider] = useState<ProviderItem>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [providerData] =
					await Promise.all([
						getProvider(token, providerId),
					]);
				setProvider(providerData);
			} catch (error) {
				console.error('Erro ao buscar dados:', error);
			}
		};

		fetchData();
	}, [providerId, token]);

	return (
		<>
			{provider ?
				<>
				<HeaderSection providerImg={`${backendUrlReplaced}/${provider?.image_url}`} />
			
					<CardsProvider token={token} provider={provider} />
				</> :
				<div className='cards'>
					<h1>Provider not found</h1>
				</div>
			}
		</>
	)
}

export default ProviderDetails