
import { useState, useEffect } from 'react';

export default function useMediaQuery(query) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		const listener = () => setMatches(media.matches);
		listener(); // Initial check
		window.addEventListener('resize', listener);
		return () => window.removeEventListener('resize', listener);
	}, [query]);

	return matches;
}
