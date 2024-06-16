import { useGoogleLogin } from '@react-oauth/google';

// Импорт сервисов
import { googleAuthService } from '../services/GoogleAuthService';

export function SignInGoogleButton(){

    const login = useGoogleLogin({
        onSuccess: async codeResponse => {
            const authToken = await googleAuthService.authorizationWithGoogle(codeResponse.code);
            localStorage.setItem('access', authToken.access_token);
            localStorage.setItem('refresh', authToken.refresh_token);
        },
        flow: 'auth-code',
    });

    const handleButtonClick = (event: any) => {
        event.preventDefault();
        login();
    };

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