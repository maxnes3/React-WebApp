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
    role: string,
    setRole: (e: SetStateAction<string>) => void,
    isAuth: boolean,
    setIsAuth: (e: SetStateAction<boolean>) => void,
    isAuthBoolean: () => boolean
}

export function Navbar({ role, setRole, isAuth, setIsAuth, isAuthBoolean }: NavbarProps){
    // Навигация
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleFavorites = () => {
        navigate('/favorites');
    };

    const handleTwoFactor = () => {
        navigate('/twofactor');
    };

    const handleLogout = () => {
        localStorageService.removeTokenFromStorage();
        setIsAuth(isAuthBoolean());
        setRole("");
        navigate('/signin');
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
                                icon="/user-icon.svg"
                                list={[
                                    {
                                        label: 'Профиль',
                                        onClick: handleProfile
                                    },
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
                        {role === "ROLE_MODERATOR" && (
                            <LinkIcon
                            link="/survey-creation"
                            icon="/moderator-icon.svg"
                            name="Модератор"
                            />
                        )}
                        {role === "ROLE_OPERATOR" && (
                          <>
                              <LinkIcon
                                link="/route-creation"
                                icon="/route-icon.svg"
                                name="Оператор"
                              />
                              <LinkIcon
                                link="/flight-creation"
                                icon="/flight-icon.svg"
                                name="Оператор"
                              />
                          </>
                        )}
                        <LinkIcon
                          link="/surveys"
                          icon="/survey-icon.svg"
                          name="Опросы"
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