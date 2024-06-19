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