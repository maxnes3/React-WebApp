import axios from "axios";

class FlightService{
    URL = 'http://localhost:8081/api/v1/flights'

    async SearhFlight(){
        const responce = await axios.get(this.URL + '/search')
        return responce
    }
}

export const flightService = new FlightService()