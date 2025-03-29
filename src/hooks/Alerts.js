import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

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
