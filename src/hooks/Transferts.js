// hooks/useTransferts.jsx
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const SAMPLE_DATA = [
	{
		id: 1,
		typeProprietaireA: 'Caisse',
		typeProprietaireB: 'Compte',
		valeurTypeProprietaireA: {
			designation: 'Caisse Paris',
			numeroCompte: 'FR76 1234 5678 901'
		},
		valeurTypeProprietaireB: {
			designation: 'BNP Paribas',
			numeroCompte: 'FR33 9876 5432 109'
		},
		agentMissions: ['Agent Jean'],
		chargéMission: 'Marc Dubois',
		etat: 'EN COURS',
		creator: 'Admin',
		validator: 'Sophie Lefevre',
		dateCreation: DateTime.local().minus({ days: 2 }).toISO(),
		montant: 15000.99,
		vehicule: 'VL-456-AB',
		sac: 'Sac sécurisé 001',
		trajet: 'Paris → Lyon',
		alertes: []
	},
	// Ajoutez d'autres échantillons similaires avec tous les champs
];

const useTransferts = (apiUrl) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(apiUrl);

				if (!response.ok) {
					throw new Error(`Erreur HTTP : ${response.status}`);
				}

				let result = await response.json();

				// Formatage des données
				const formattedData = Array.isArray(result)
					? result.map(item => ({
						...item,
						dateCreation: DateTime.fromISO(item.dateCreation)
							.setLocale('fr')
							.toFormat("dd/MM/yyyy HH:mm")
					}))
					: SAMPLE_DATA.map(item => ({
						...item,
						dateCreation: DateTime.fromISO(item.dateCreation)
							.setLocale('fr')
							.toFormat("dd/MM/yyyy HH:mm")
					}));

				setData(formattedData.length > 0 ? formattedData : SAMPLE_DATA);

			} catch (err) {
				setError(err.message);
				setData(SAMPLE_DATA); // Données de secours
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [apiUrl]);

	return { data, loading, error };
};

export default useTransferts;