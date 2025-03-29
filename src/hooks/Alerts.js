import useSWR from 'swr';

const fetcher = async (...args) => {
	try {
		const response = await fetch(...args);
		if (!response.ok) throw new Error('Erreur HTTP'); // Gestion des erreurs HTTP [[9]]
		return await response.json();
	} catch (error) {
		console.error('Erreur lors de la récupération des données:', error); // Log détaillé [[6]]
		throw error; // Transmission de l'erreur à SWR [[5]]
	}
};

export const Alerts = () => {
	const { data, error, isLoading } = useSWR('/api/alerts', fetcher, {
		refreshInterval: 60000,
		revalidateOnFocus: true,
		revalidateOnReconnect: true,
	});

	return {
		alerts: data || [],
		isLoading,
		isError: error,
	};
};
