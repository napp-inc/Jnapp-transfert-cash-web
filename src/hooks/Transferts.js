import { useState, useEffect } from 'react';

export default function TransfertsInProgress(url) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);

				// Vérification du format de réponse [[7]][[8]]
				const contentType = response.headers.get('content-type');
				if (!contentType || !contentType.includes('application/json')) {
					// Données mock en cas de réponse non-JSON [[6]]
					const mockData = [
						{
							transfert: 'TRF-2025-0329-001',
							date: '29/03/2025',
							chargé: 'Lucas Mboukou',
							validateur: 'Estelle Lekoundou',
							véhicule: 'IVECO DAILY 35S14',
							sac: 'SAC-2025-BRA-301',
							trajet: 'Brazzaville → Kinkala',
							alertes: 1,
							montant: '45 200 000 FCFA',
							satus: 'En cours',
						},
						{
							transfert: 'TRF-2025-0329-002',
							date: '29/03/2025',
							chargé: 'Yannick Mabika',
							validateur: 'Nadia Moukoko',
							véhicule: 'MERCEDES ACTROS 1843',
							sac: 'SAC-2025-POI-772',
							trajet: 'Pointe-Noire → Nkayi',
							alertes: 0,
							montant: '88 500 000 FCFA',
							status: 'Terminé',
						},
					];
					setData(mockData);
					return; // Arrête l'exécution pour éviter JSON.parse [[8]]
				}

				if (!response.ok) throw new Error('Erreur réseau');

				const jsonData = await response.json();
				setData(Array.isArray(jsonData) ? jsonData : []);
			} catch (err) {
				setError(err.message);
				setData([]); // Garantit un tableau vide [[6]]
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, loading, error };
}
