// Импорт компонентов из ./components/
import { LinkIcon } from "./components/LinkIcon.tsx";
import { DropdownButton } from "./components/DropdownButton.tsx";

// Импорт компонентов из React
import { SetStateAction } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

// Навигационная панель
export function Navbar({ isAuth, setIsAuth, isAuthBoolean, isTwoFactor, setIsTwoFactor }: NavbarProps){
    // Навигация
    const navigate = useNavigate();

    // Переход к избранному
    const handleFavorites = () => {
        navigate('/favorites');
    };

    // Переход к добавлению двухфакторной авторизации
    const handleTwoFactor = () => {
        navigate('/twofactor');
    };
    
    // Пеход к купленным билетам
    const handlePurchasedTickets = () => {
        navigate('/tickets/true');
    };

    // Пеход к забронированным билетам
    const handleReservationTickets = () => {
        navigate('/tickets/false');
    };

    // Выход из аккаунта
    const handleLogout = () => {
        localStorageService.removeTokenFromStorage();
        setIsAuth(isAuthBoolean());
        setIsTwoFactor(localStorageService.setIsTwoFactor(false));
        toast('Вы вышли из аккаунта!', {
            type: 'success',
            theme: 'light'
        });
        navigate('/');
    };

    // Добавление двухфакторной авторизации если нет
    const listIsNotTwoFactor = () => {
        const newList = listIsTwoFactor;
        newList.unshift({
            label: 'Двухфакторная',
            onClick: handleTwoFactor
        });
        return newList;
    }

    // 
    const listIsTwoFactor = [
        {
            label: 'Избранное',
            onClick: handleFavorites
        },
        {
            label: 'Купленные Билеты',
            onClick: handlePurchasedTickets
        },
        {
            label: 'Забронированные',
            onClick: handleReservationTickets
        },
        {
            label: 'Выйти',
            onClick: handleLogout
        },
    ];

    // Вёрстка компонента
    return (
        <nav className={`w-full ${colorsPresets.primaryBackground} ${colorsPresets.primaryTextBlack} p-4 shadow-md`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className={`text-2xl font-bold`}>
                    <span className={`${colorsPresets.primaryTextWhite}`}>SkyWings</span><span className={`${colorsPresets.primaryTextOrange}`}>Express</span>
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
                                label={localStorageService.getEmailFromToken() ?? 'Unknown User'}
                                color={colorsPresets.primaryTextWhite}
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