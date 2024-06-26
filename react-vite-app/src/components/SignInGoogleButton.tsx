// Импорт компонентов из React
import { useGoogleLogin } from '@react-oauth/google';
import { SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Импорт сервисов
import { googleAuthService } from '../services/GoogleAuthService.ts';
import { localStorageService } from '../services/LocalStorageService.ts';

// Иницализация входных веременных
interface SignInGoogleButtonProps{
    setIsAuth: (e: SetStateAction<boolean>) => void,
    isAuthBoolean: () => boolean,
    setIsTwoFactor: (e: SetStateAction<boolean>) => void
}

export function SignInGoogleButton({ setIsAuth, isAuthBoolean, setIsTwoFactor }: SignInGoogleButtonProps){
    // Навигация
    const navigate = useNavigate();

    // Функция для работы с @react-oauth/google
    const login = useGoogleLogin({
        onSuccess: async codeResponse => {
            const authToken = await googleAuthService.authorizationWithGoogle(codeResponse.code);
            localStorageService.setTokenToStorage(authToken);
            setIsAuth(isAuthBoolean());
            setIsTwoFactor(localStorageService.setIsTwoFactor(true));
            toast('Вы успешно вошли через Google!', {
                type: 'success',
                theme: 'light'
            });
            navigate('/');
        },
        flow: 'auth-code',
    });

    // Предотвращаем обновление страницы при нажатии
    const handleButtonClick = (event: any) => {
        event.preventDefault();
        login();
    };

    // Вёрстка компонента
    return (
        <button
            onClick={handleButtonClick}
            className={`flex items-center space-x-2 p-2 px-6 py-3 bg-transparent border-2 border-googleBlue text-white font-bold rounded-md hover:bg-googleBlue hover:border-transparent focus:outline-none focus:ring-2 focus:ring-googleBlue`}>
            <img src="/google-icon.svg" 
                alt="google"
                className={`h-4 w-4`}
            />
            <span>Sign in with Google</span>
        </button>
    );
}