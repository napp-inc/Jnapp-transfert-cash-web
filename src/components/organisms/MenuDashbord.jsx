'use client';
//import Link from 'next/link';
//import Image from 'next/image';
import { useState } from 'react';
import useMediaQuery from '../../hooks/UseMediaQuery';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import MenuItem from '../molecules/MenuItems';
//import MenuHeader from '../molecules/MenuHeader';
import MenuSection from '../molecules/MenuSection';
import Button from '../atoms/Button';
import MenuDivider from '../atoms/MenuDivider';
import Logo from '../atoms/Logo';

export default function Menu() {
    const router = useRouter();
    const { logout } = useAuth();
    const [isHidden, setIsHidden] = useState(false);
    const isMobile = useMediaQuery('(max-width: 767px)');

    const toggleVisibility = () => {
        if (isMobile) setIsHidden((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/');
            console.log('Déconnexion réussie');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow-md w-5/5 sm:w-1/5 test">
            <div className="flex items-center space-x-2 mb-4 test" onClick={toggleVisibility}>
                <Logo src='https://i.ibb.co/1ts0fBm9/Frame-36.png test' style={{ border: '1px solid green' }} alt="Logo Kin Distribution" size="w-8 h-8 rounded-full" />
                <h1 className="text-xl font-bold test">J-napps Tracker</h1>
            </div>

            <MenuDivider isHidden={isHidden} isMobile={isMobile} />

            <MenuSection isHidden={isHidden} isMobile={isMobile}>
                <MenuItem src="/menuIcones/dashboardIconeInactive.svg" alt="icone menu" href="/dashboard" label="Tableau de bord" />
                <MenuItem src="/menuIcones/vehicleIconeInactive.svg" alt="icone menu" href="/vehicules" label="Véhicules" />
                <MenuItem src="/menuIcones/transfertIconeInactive.svg" alt="icone menu" href="/transferts" label="Transferts" />
                <MenuItem src="/menuIcones/alertsIconeInactive.svg" alt="icone menu" href="/alerts" label="Alertes" />
                <MenuItem src="/menuIcones/reportsIconeInactive.svg" alt="icone menu" href="/reports" label="Rapports" />
            </MenuSection>

            <MenuDivider isHidden={isHidden} isMobile={isMobile} />

            <MenuSection isHidden={isHidden} isMobile={isMobile}>
                <MenuItem src="/menuIcones/accountIconeInactive.svg" alt="icone menu" href="#" label="Compte" />
                <MenuItem src="/menuIcones/settingsIconeInactive.svg" alt="icone menu" href="#" label="Paramètres" />
                <Button
                    text="Deconnexion"
                    type="submit"
                    onClick={handleLogout}
                />
            </MenuSection>
        </div>
    );
}
