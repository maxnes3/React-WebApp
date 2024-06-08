import axios from "axios";

class SignInService{
    URL = 'http://localhost:8081/api/v1/signin'

    async registration(dto: SignUpDto){
        try{
            const response = await axios.post(`${this.URL}/signUp`, dto)
            return response.data
        } catch (error) { 
            console.error('Error fetching flights:', error);
            throw error;
        }
    }

    async authorization(dto: SignInDto){
        try{
            const response = await axios.post(this.URL, dto)
            return response.data
        } catch (error) { 
            console.error('Error fetching flights:', error);
            throw error;
        }
    }
}

export const signInService = new SignInService()