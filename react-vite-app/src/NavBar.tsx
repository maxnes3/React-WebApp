// Импорт компонентов из ./components/
import { LinkIcon } from "./components/LinkIcon.tsx";
import { DropdownButton } from "./components/DropdownButton.tsx";
import { RootStateTypes } from "./store/types.ts";
import { setIsAuth } from "./store/isAuthSlice.ts";

// Импорт компонентов из React
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";

// Импорт сервисов
import { localStorageService } from './services/LocalStorageService.ts';

// Импорт стилей
import { colorsPresets } from "./styles/colorsPresets.ts";
import { setIsTwoFactor } from "./store/isTwoFactorSlice.ts";


// Навигационная панель
export function Navbar(){
    // Навигация
    const navigate = useNavigate();

    // Получение состояния isAuth с типизацией
    const isAuth = useSelector((state: RootStateTypes) => state.isAuth.isAuth);

    const isTwoFactor = useSelector((state: RootStateTypes) => state.isTwoFactor.isTwoFactor);

    const dispatch = useDispatch();

    const setIsAuthSatus = (authStatus: boolean) => dispatch(setIsAuth(authStatus));

    const setIsTwoFactorSatus = (twoFactorStatus: boolean) => dispatch(setIsTwoFactor(twoFactorStatus));

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
        navigate('/tickets');
    };

    // Выход из аккаунта
    const handleLogout = () => {
        localStorageService.removeTokenFromStorage();
        setIsAuthSatus(false);
        setIsTwoFactorSatus(localStorageService.setIsTwoFactor(false));
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
            label: 'Билеты',
            onClick: handlePurchasedTickets
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