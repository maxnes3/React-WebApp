import axios from "axios";

class FlightService{
    URL = 'http://localhost:8081/api/v1/flights'

    async searchFlight(from: string, to: string, fromDate: string, toDate: string) {
        try {
            const response = await axios.get(`${this.URL}/search`, {
                params: {
                    from,
                    to,
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