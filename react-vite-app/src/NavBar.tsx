// Импорт компонентов из ./components/
import { LinkIcon } from "./components/LinkIcon.tsx";
import { DropdownButton } from "./components/DropdownButton.tsx";

// Импорт компонентов из React
import { SetStateAction } from "react";
import { useNavigate } from 'react-router-dom';

// Импорт сервисов
import { localStorageService } from './services/LocalStorageService.ts';

// Импорт стилей
import { colorsPresets } from "./styles/colorsPresets.ts";

interface NavbarProps{
    isAuth: boolean,
    setIsAuth: (e: SetStateAction<boolean>) => void,
    isAuthBoolean: () => boolean,
    isTwoFactor: boolean
}

export function Navbar({ isAuth, setIsAuth, isAuthBoolean, isTwoFactor }: NavbarProps){
    // Навигация
    const navigate = useNavigate();

    const handleFavorites = () => {
        navigate('/favorites');
    };

    const handleTwoFactor = () => {
        navigate('/twofactor');
    };

    const handleLogout = () => {
        localStorageService.removeTokenFromStorage();
        setIsAuth(isAuthBoolean());
    };

    return (
        <nav className={`w-full ${colorsPresets.primaryBackground} ${colorsPresets.primaryTextBlack} p-4 shadow-md`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className={`text-2xl ${colorsPresets.primaryTextBlack} font-bold`}>
                    SkyWingsExpress
                </div>
                <div>
                    <div className={"flex space-x-4 p-4"}>
                        {!isAuth ? (
                            <LinkIcon
                                link="/signin"
                                icon="/login-icon.svg" 
                                name="Войти"
                            />
                        ) : (
                            <DropdownButton 
                                icon={isTwoFactor ? "/verified-icon.svg" : "/user-icon.svg"}
                                list={[
                                    {
                                        label: 'Избранное',
                                        onClick: handleFavorites
                                    },
                                    {
                                        label: 'Двухфакторная',
                                        onClick: handleTwoFactor
                                    },
                                    {
                                        label: 'Выйти',
                                        onClick: handleLogout
                                    }
                                ]}
                            />
                        )}
                        <LinkIcon
                            link="/survey-creation"
                            icon="/moderator-icon.svg" 
                            name="Модератор"
                        />
                        <LinkIcon
                            link="/"
                            icon="/operator-icon.svg" 
                            name="Оператор"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}