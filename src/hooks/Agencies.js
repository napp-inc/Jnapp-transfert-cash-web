import { useState, useEffect } from 'react';

export default function GetAgencies(apiUrl) {
	const [agencies, setAgencies] = useState([]); // État pour stocker les agences transformées

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(apiUrl); // Appel au backend
				if (!response.ok) {
					throw new Error('Network response was not ok'); // Gestion des réponses non valides
				}
				const result = await response.json(); // Extraction des données JSON

				// Transformation des données au format souhaité
				const transformedAgencies = result.agences.map((agence, index) => ({
					id: index + 1, // Générer un ID séquentiel
					name: agence.name,
					lat: agence.latitude,
					lng: agence.longitude,
				}));

				setAgencies(transformedAgencies); // Mise à jour de l'état avec les données transformées
			} catch (err) {
				console.error('Erreur lors de la récupération des données :', err.message);
				setAgencies([]); // En cas d'erreur, retourner un tableau vide
			}
		};

		fetchData(); // Appel de la fonction de récupération des données
	}, [apiUrl]); // Dépendance : le hook se réexécute si l'URL change

	return agencies;
}
