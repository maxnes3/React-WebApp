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
    isTwoFactor: boolean,
    setIsTwoFactor: (e: SetStateAction<boolean>) => void
}

export function Navbar({ isAuth, setIsAuth, isAuthBoolean, isTwoFactor, setIsTwoFactor }: NavbarProps){
    // Навигация
    const navigate = useNavigate();

    const handleFavorites = () => {
        navigate('/favorites');
    };

    const handleTwoFactor = () => {
        navigate('/twofactor');
    };

    const handleTickets = () => {
        navigate('/tickets');
    };

    const handleLogout = () => {
        localStorageService.removeTokenFromStorage();
        setIsAuth(isAuthBoolean());
        setIsTwoFactor(localStorageService.setIsTwoFactor(false));
        navigate('/');
    };

    const listIsNotTwoFactor = () => {
        const newList = listIsTwoFactor;
        newList.unshift({
            label: 'Двухфакторная',
            onClick: handleTwoFactor
        });
        return newList;
    }

    const listIsTwoFactor = [
        {
            label: 'Избранное',
            onClick: handleFavorites
        },
        {
            label: 'Купленные Билеты',
            onClick: handleTickets
        },
        {
            label: 'Выйти',
            onClick: handleLogout
        },
    ];

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
                                list={isTwoFactor ? listIsTwoFactor : listIsNotTwoFactor()}
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