import { useState, useEffect } from 'react';

export default function TransfertsInProgress(url) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const contentType = response.headers.get('content-type');
				if (!contentType || !contentType.includes('application/json')) {
					setData([]);
					return;
				}

				if (!response.ok) throw new Error('Erreur réseau');

				const jsonData = await response.json();
				setData(Array.isArray(jsonData) ? jsonData : []);
			} catch (err) {
				setError(err.message);
				setData([]);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, loading, error };
}
