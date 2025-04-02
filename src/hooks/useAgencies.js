import { backendAgencies } from '../endPointsAndKeys';
import useSWR from 'swr';

const useAgencies = () => {
    // Valeur par défaut du point  en cas d'erreur ou de données manquantes
    const defaultStatic = [{ id: 1, name: 'AGENCE PAR DÉFAUT', lat: 0, lng: 0 }];
    // SWR pour récupérer les données
    const { data, error } = useSWR(
        backendAgencies,
        () =>
            fetch(backendAgencies).then((res) => {
                if (!res.ok) throw new Error('API error');
                return res.json();
            }),
        { revalidateOnFocus: false } // Désactiver la revalidation lors du focus
    );
    // Transformation des données (si elles existent)
    const transformedData = data?.agences?.map((agence, index) => ({
        id: index + 1, // ID séquentiel
        name: agence.name,
        lat: agence.latitude,
        lng: agence.longitude,
    }));

    return error ? defaultStatic : transformedData || defaultStatic;
};
export default useAgencies;