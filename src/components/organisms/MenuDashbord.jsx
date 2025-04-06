"use client";
import { useState } from "react";
import useMediaQuery from "../../hooks/UseMediaQuery";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import MenuItem from "../molecules/MenuItems";
import MenuSection from "../molecules/MenuSection";
import Button from "../atoms/Button";
import MenuDivider from "../atoms/MenuDivider";
import Logo from "../atoms/Logo";
import {
    BsSpeedometer2,// Speedometer icon
    BsCarFront,// Car icon
    BsPeople,// People icon
    BsBuildings,// Buildings icon
    BsArrowLeftRight,// Arrow left right icon
    BsBell,// Bell icon
    BsClipboardData,// Clipboard data icon
    BsPerson,// Person icon
    BsGear,// Gear icon
    BsChevronRight,// Chevron right icon
    BsPlusCircle,// Plus circle icon
    BsShieldPlus// Shield plus icon
} from "react-icons/bs";

export default function Menu() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const router = useRouter();
    const { logout } = useAuth();
    const [isHidden, setIsHidden] = useState(false);
    const isMobile = useMediaQuery("(max-width: 767px)");

    const toggleVisibility = () => {
        if (isMobile) setIsHidden((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/");
            console.log("Déconnexion réussie");
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };
    return (
        <div className="bg-white p-4 rounded shadow-md w-5/5 sm:w-1/5 test">
            <div className="flex items-center space-x-2 mb-4 test" onClick={toggleVisibility}>
                <Logo
                    src="https://i.ibb.co/1ts0fBm9/Frame-36.png"
                    style={{ border: "1px solid green" }}
                    alt="Logo Kin Distribution"
                    size="w-8 h-8 rounded-full"
                />
                <h1 className="text-xl font-bold test">J-napps Tracker</h1>
            </div>

            <MenuDivider isHidden={isHidden} isMobile={isMobile} />

            <MenuSection isHidden={isHidden} isMobile={isMobile}>
                {/* Use React Icons instead of SVG paths */}
                <MenuItem icon={BsSpeedometer2} href="/dashboard" label="Tableau de bord" />

                <MenuItem icon={BsCarFront} href="/vehicules/add-vehicle" label="Véhicules" />
                {/* Sous menu des véhicules */}
                <div
                    className={`${isSettingsOpen ? "max-h-fit" : "max-h-0"
                        } overflow-hidden transition-all duration-300`}
                >
                    <MenuItem
                        icon={BsPlusCircle}
                        href="/vehicules/list-vehicle"
                        label="Liste des véhicules"
                        className="ml-6"
                    />
                    <MenuItem
                        icon={BsShieldPlus}
                        href="/vehicules/add-vehicle"
                        label="Ajouter un véhicule"
                        className="ml-6"
                    />
                </div>

                <MenuItem icon={BsPeople} href="/agents/create-agent" label="Agents" />
                {/* Sous menu des Agents */}
                <div
                    className={`${isSettingsOpen ? "max-h-fit" : "max-h-0"
                        } overflow-hidden transition-all duration-300`}
                >
                    <MenuItem
                        icon={BsPlusCircle}
                        href="/agents/list-agents"
                        label="Liste des agents"
                        className="ml-6"
                    />
                    <MenuItem
                        icon={BsShieldPlus}
                        href="/agents/create-agent"
                        label="Ajouter un agent"
                        className="ml-6"
                    />
                </div>

                <MenuItem icon={BsBuildings} href="/agency/add-agency" label="Agences" />
                {/* Sous menu des Agences */}
                <div
                    className={`${isSettingsOpen ? "max-h-fit" : "max-h-0"
                        } overflow-hidden transition-all duration-300`}
                >
                    <MenuItem
                        icon={BsPlusCircle}
                        href="/agency/list-agency"
                        label="Liste des agences"
                        className="ml-6"
                    />
                    <MenuItem
                        icon={BsShieldPlus}
                        href="/agency/add-agency"
                        label="Ajouter une agence"
                        className="ml-6"
                    />
                </div>

                <MenuItem icon={BsBuildings} href="/organisation" label="Organisation" />


                <MenuItem icon={BsArrowLeftRight} href="/transferts" label="Transferts" />
                {/* Sous menu des paramètres */}
                <div
                    className={`${isSettingsOpen ? "max-h-fit" : "max-h-0"
                        } overflow-hidden transition-all duration-300`}
                >
                    <MenuItem
                        icon={BsPlusCircle}
                        href="/settings/add-roles"
                        label="Ajouter un rôle"
                        className="ml-6"
                    />
                    <MenuItem
                        icon={BsShieldPlus}
                        href="/settings/add-permissions"
                        label="Ajouter des permissions"
                        className="ml-6"
                    />
                </div>

                <MenuItem icon={BsBell} href="/alerts" label="Alertes" />
                {/* Sous menu des paramètres */}
                <div
                    className={`${isSettingsOpen ? "max-h-fit" : "max-h-0"
                        } overflow-hidden transition-all duration-300`}
                >
                    <MenuItem
                        icon={BsPlusCircle}
                        href="/settings/add-roles"
                        label="Ajouter un rôle"
                        className="ml-6"
                    />
                    <MenuItem
                        icon={BsShieldPlus}
                        href="/settings/add-permissions"
                        label="Ajouter des permissions"
                        className="ml-6"
                    />
                </div>

                <MenuItem icon={BsClipboardData} href="/reports" label="Rapports" />
                {/* Sous menu des paramètres */}
                <div
                    className={`${isSettingsOpen ? "max-h-fit" : "max-h-0"
                        } overflow-hidden transition-all duration-300`}
                >
                    <MenuItem
                        icon={BsPlusCircle}
                        href="/settings/add-roles"
                        label="Ajouter un rôle"
                        className="ml-6"
                    />
                    <MenuItem
                        icon={BsShieldPlus}
                        href="/settings/add-permissions"
                        label="Ajouter des permissions"
                        className="ml-6"
                    />
                </div>

            </MenuSection>

            <MenuDivider isHidden={isHidden} isMobile={isMobile} />

            <MenuSection isHidden={isHidden} isMobile={isMobile}>
                <MenuItem icon={BsPerson} href="#" label="Compte" />


                <MenuItem
                    icon={BsGear}
                    href="#"
                    label="Paramètres"
                    rightIcon={() => (
                        <BsChevronRight
                            className={`w-4 h-4 transition-transform ${isSettingsOpen ? "rotate-90" : ""
                                }`}
                        />
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        setIsSettingsOpen(!isSettingsOpen);
                    }}
                />

                {/* Sous menu des paramètres */}
                <div
                    className={`${isSettingsOpen ? "max-h-fit" : "max-h-0"
                        } overflow-hidden transition-all duration-300`}
                >
                    <MenuItem
                        icon={BsPlusCircle}
                        href="/settings/add-roles"
                        label="Ajouter un rôle"
                        className="ml-6"
                    />
                    <MenuItem
                        icon={BsShieldPlus}
                        href="/settings/add-permissions"
                        label="Ajouter des permissions"
                        className="ml-6"
                    />
                </div>


                <Button text="Deconnexion" type="submit" onClick={handleLogout} />
            </MenuSection>
        </div>
    );
}