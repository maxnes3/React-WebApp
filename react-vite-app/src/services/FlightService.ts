import axios from "axios";

class FlightService{
    URL = 'http://localhost:8081/api/v1/flights'

    async searchFlight(fromCity: string, toCity: string, fromDate: string, toDate: string) {
        try {
            const response = await axios.get(`${this.URL}/search`, {
                params: {
                    fromCity,
                    toCity,
                    fromDate,
                    toDate,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching flights:', error);
            throw error;
        }
    }
}

export const flightService = new FlightService()