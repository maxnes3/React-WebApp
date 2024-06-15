import axios from "axios";

class GoogleAuthService{
    URL = 'http://localhost:8081/api/v1/google'

    private async getGoogleToken(authCode: string){
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
        const redirectUri = 'http://localhost:5173';

        const params = new URLSearchParams();
        params.append('code', authCode);
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        params.append('redirect_uri', redirectUri);
        params.append('grant_type', 'authorization_code');

        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', params.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    }

    async authorizationWithGoogle(authCode: string){
        try {
            const googleToken = await this.getGoogleToken(authCode);

            console.log('Access Token:', googleToken.access_token);
            console.log('Refresh Token:', googleToken.refresh_token);

            const response = await axios.post(this.URL, googleToken.access_token)

            console.log('Access Token:', response.data.access_token);
            console.log('Refresh Token:', response.data.refresh_token);
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    }
}

export const googleAuthService = new GoogleAuthService()