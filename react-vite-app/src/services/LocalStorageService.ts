import { jwtDecode, JwtPayload } from 'jwt-decode';

interface MailJwtPayload extends JwtPayload {
    email: string;
}

class LocalStorageService {
    private accessName = 'access';
    private refreshName = 'refresh';
    private isTwoFactorName = 'isTwoFactor';

    setTokenToStorage(token: any) {
        try {
            localStorage.setItem(this.accessName, token.access_token);
            localStorage.setItem(this.refreshName, token.refresh_token);
        } catch (error) {
            console.error('Error set token to storage:', error);
            throw error;
        }
    }

    getAccessToken(){
        return localStorage.getItem(this.accessName);
    }

    getEmailFromToken() {
        try {
            const accessToken = this.getAccessToken();
            if (!accessToken) {
                throw new Error('Access token not found');
            }
            const decodedToken = jwtDecode<MailJwtPayload>(accessToken);
            return decodedToken.email;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    removeTokenFromStorage(){
        localStorage.removeItem(this.accessName);
        localStorage.removeItem(this.refreshName);
    }

    getIsTwoFactor(){
        return JSON.parse(localStorage.getItem(this.isTwoFactorName) || 'false');
    }

    setIsTwoFactor(value: boolean){
        localStorage.setItem(this.isTwoFactorName, `${value}`);
        return this.getIsTwoFactor();
    }
}

export const localStorageService = new LocalStorageService()