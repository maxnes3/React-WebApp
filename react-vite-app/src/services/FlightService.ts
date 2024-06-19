import axios from "axios";

import {NewFlightDto} from "../types/Flight.ts";

class FlightService {
    URL = 'http://localhost:8081/api/v1/flights'
    OPERATOR_URL = 'http://localhost:8081/api/v1/operator/flights'

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

    async create(flight: NewFlightDto) {
        await axios.post(`${this.OPERATOR_URL}`,
          flight,
          {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem("access")}`,
              }
          })
          .then(response => {
              console.log(response.data);
          })
          .catch(error => {
              console.error('Ошибка создания опроса:', error);
          });
    }
}

export const flightService = new FlightService()