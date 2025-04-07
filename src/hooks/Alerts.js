import axios from 'axios';

const fetcher = async (...args) => {
	try {
		const response = await fetch(...args);
		if (!response.ok) throw new Error('Erreur HTTP');
		return await response.json();
	} catch (error) {
		console.error('Erreur lors de la récupération des données:', error);
		throw error;
	}
};

export const Alerts = () => {
	//const { data, error, isLoading } = await axios.get(backendAgencies);

	return {
		alerts: [
			{
				type: 'warning',
				title: "Déviation d'itinéraire",
				subtitle: 'Transfert ID_TRANSFERT de AGENCE A vers AGENCE B',
				timestamp: '2023-10-01 14:30',
			},
			{
				type: 'maintenance',
				title: 'Maintenance véhicule programmé',
				subtitle: 'Véhicule ID_VEHICULE',
				timestamp: '2023-10-01 14:32',
			},

			{
				type: 'warning',
				title: 'Arrêt suspect',
				subtitle: 'Transfert ID_TRANSFERT de BANQUE A vers AGENCE B',
				timestamp: '2023-10-01 14:35',
			},

			{
				type: 'maintenance',
				title: 'Maintenance véhicule programmé',
				subtitle: 'Véhicule ID_VEHICULE',
				timestamp: '2023-10-01 14:36',
			},
		],

	};
};
