import axios from "axios";

import { localStorageService } from "./LocalStorageService";

class SignInService{
    URL = 'http://localhost:8081/api/v1/auth'

    async registration(dto: SignUpDto){
        try{
            const response = await axios.post(`${this.URL}/signUp`, dto);
            return response.data;
        } catch (error) { 
            console.error('Error fetching regist:', error);
            throw error;
        }
    }

    async authorization(dto: SignInDto){
        try{
            const response = await axios.post(`${this.URL}/signIn`, dto);
            return response.data;
        } catch (error) { 
            console.error('Error fetching auth:', error);
            throw error;
        }
    }

    async checkTwoFactor(dto: SignInDto) {
        try{
            const response = await axios.post(`${this.URL}/checkUserOnOtp`, dto);
            return response.data;
        } catch (error) { 
            console.error('Error fetching check:', error);
            throw error;
        }
    }

    async authorizationTwoFactor(dto: SignInWithOtp){
        try{
            const response = await axios.post(`${this.URL}/signInWithOtp`, dto);
            return response.data;
        } catch (error) { 
            console.error('Error fetching auth:', error);
            throw error;
        }
    }

    async getTwoFactorCode() {
        try{
            const response = await axios.get(`${this.URL}/generate2faCode`, {
                headers: {
                    'Authorization': `Bearer ${localStorageService.getAccessToken()}`
                }
            });
            return response.data;
        } catch (error) { 
            console.error('Error fetching auth:', error);
            throw error;
        }
    }

    async submitTwoFactorCode(dto: SubmitTwoFaDto) {
        try{
            const response = await axios.post(`${this.URL}/submit2faCode`, dto, {
                headers: {
                    'Authorization': `Bearer ${localStorageService.getAccessToken()}`
                }
            });
            return response.data;
        } catch (error) { 
            console.error('Error fetching auth:', error);
            throw error;
        }
    }
}

export const signInService = new SignInService()