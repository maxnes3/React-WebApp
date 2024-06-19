import { jwtDecode, JwtPayload } from 'jwt-decode';

interface MailJwtPayload extends JwtPayload {
    email: string;
}

interface RoleJwtPayload extends JwtPayload {
    realm_access: {
        roles: string[]
    };
}

class LocalStorageService {
    private accessName = 'access';
    private refreshName = 'refresh';

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

    getUserRoleFromToken() {
        const token = localStorage.getItem(this.accessName);
        if (token) {
            try {
                const decodedToken = jwtDecode<RoleJwtPayload>(token).realm_access;
                return decodedToken.roles.find(r => r.includes("ROLE_")) || "ROLE_USER";
            } catch (error) {
                console.error('Error decoding token:', error);
                return "ROLE_USER";
            }
        }
    }
}

export const localStorageService = new LocalStorageService()