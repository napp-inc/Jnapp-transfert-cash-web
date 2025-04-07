import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Vérifie l'état d'authentification
    const checkAuthStatus = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                // Récupère le token actuel pour vérifier sa validité
                const idToken = await user.getIdToken();
                localStorage.setItem('idToken', idToken); // Stocke le token dans le localStorage
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        } catch (error) {
            console.error("Erreur lors de la vérification de l'authentification:", error);
            setCurrentUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Abonnement aux changements d'état d'authentification Firebase
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                checkAuthStatus(); // Vérifie l'état d'authentification
            } else {
                setCurrentUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe(); // Nettoie l'abonnement
    }, []);

    const value = {
        currentUser,
        loading,
        checkAuthStatus, // Ajoutez cette méthode pour vérifier explicitement l'état
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);