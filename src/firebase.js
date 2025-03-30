import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBtGIHGpjOcISAxUL90Jtz2oj8Kb5p4ZjA',
	authDomain: 'stagiaire-2025.firebaseapp.com',
	projectId: 'stagiaire-2025',
	storageBucket: 'stagiaire-2025.firebasestorage.app',
	messagingSenderId: '471560127076',
	appId: '1:471560127076:web:6760e84408894106545571',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const apiBackendRoute = "http://localhost:3001";
export const apiKeyGoogleMaps = "AIzaSyBf2zOFDzh_TxDRl0Lg6Jqp8sZMJ9Z-j7I";
