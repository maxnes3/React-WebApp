interface Flight {
  id: number;
  flightNumber: string;
  route: {
    origin: string;
    destination: string;
  };
  departureTime: string;
  arrivalTime: string;
  ticketPrice: number;
  discountPercentage: number;
  priceChangePercentage: number;
}

export interface NewFlightDto {
  routeId: number;
  arrivalTime: string;
  departureTime: string;
  totalSeats: number;
  ticketPrice: number;
  discountPercentage: number;
}