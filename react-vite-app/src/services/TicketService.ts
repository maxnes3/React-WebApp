import axios from "axios";

import { localStorageService } from "./LocalStorageService";

class TicketService{
    URL = 'http://localhost:8081/api/v1/buy'

    async getTicketOnFlight(flightId: string){
        try{
            const response = await axios.get(`${this.URL}/getTicketOnFlight/${flightId}`);
            return response.data.seats;
        } catch (error) { 
            console.error('Error fetching tickets:', error);
            throw error;
        }
    }

    async buyTicket(dto: ReservationDto){
        try {
            const response = await axios.post(this.URL, dto, {
                headers: {
                    'Authorization': `Bearer ${localStorageService.getAccessToken()}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching tickets:', error);
            throw error;
        }
    }

    async reservationTicket(dto: ReservationDto){
        try {
            const response = await axios.post(`${this.URL}/reservation`, dto, {
                headers: {
                    'Authorization': `Bearer ${localStorageService.getAccessToken()}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching tickets:', error);
            throw error;
        }
    }

    async getUserBuyTicket(){
        try {
            const response = await axios.get(`${this.URL}/getUserBuyTicket`, {
                headers: {
                    'Authorization': `Bearer ${localStorageService.getAccessToken()}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching tickets:', error);
            throw error;
        }
    }

    async getTicketByNumber(ticketNumber: string){
        try {
            const response = await axios.get(`http://localhost:8081/api/v1/tickets/${ticketNumber}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tickets:', error);
            throw error;
        }
    }
}

export const ticketService = new TicketService()