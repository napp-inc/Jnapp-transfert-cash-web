'use client';
import './globals.css';
import { AuthProvider } from '../contexts/authContext';

export default function RootLayout({ children }) {
	return (
		<html lang="fr">
			<body>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
