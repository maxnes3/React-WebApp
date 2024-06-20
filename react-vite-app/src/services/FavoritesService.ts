import axios from "axios";

import {localStorageService} from "./LocalStorageService.ts";

class FavoritesService{
    URL = 'http://localhost:8081/api/v1/favorites'

    async getFavorites(){
        try {
            const response = await axios.get(this.URL, {
                headers: {
                    'Authorization': `Bearer ${localStorageService.getAccessToken()}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching favorites:', error);
            throw error;
        }
    }

    async addToFavorites(flightId: string){
        try {
            const response = await axios.get(`${this.URL}/add`, {
                headers: {
                    'Authorization': `Bearer ${localStorageService.getAccessToken()}`
                },
                params: {
                    flightId
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching favorites:', error);
            throw error;
        }
    }

    async removeFromFavorites(flightId: string){
        try {
            const response = await axios.get(`${this.URL}/remove`, {
                headers: {
                    'Authorization': `Bearer ${localStorageService.getAccessToken()}`
                },
                params: {
                    flightId
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching favorites:', error);
            throw error;
        }
    }

    async checkInFavorites(flightId: string){
        try {
            const response = await axios.get(`${this.URL}/check`, {
                headers: {
                    'Authorization': `Bearer ${localStorageService.getAccessToken()}`
                },
                params: {
                    flightId
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching favorites:', error);
            throw error;
        }
    }
}

export const favoritesService = new FavoritesService()