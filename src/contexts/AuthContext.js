import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);


	// Vérification du token au chargement
	useEffect(() => {
		const checkAuthStatus = async () => {

			if (typeof window !== 'undefined') {
				const token = localStorage.getItem('authToken');
				if (token) {
					try {
						setIsAuthenticated(true);
					} catch (error) {
						console.error('Token validation failed:', error);
					}
				}
				setLoading(false);
			}

		};
		checkAuthStatus();
	}, []);

	const login = (token) => {
		localStorage.setItem('authToken', token);
		setIsAuthenticated(true);
	};

	const logout = async () => {
		localStorage.removeItem('authToken');
		setIsAuthenticated(false);
	};

	const contextValue = {
		isAuthenticated,
		user,
		login,
		logout,
		loading,
	};

	return <AuthContext.Provider value={contextValue}>{!loading && children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
