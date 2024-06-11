// Импорт компонентов из ./components/
import { FlightCard } from "./FlightCard.tsx";

interface ListFlightsProps {
    flights: Flight[]
}

export function ListFlights({ flights }: ListFlightsProps) {
    return (
        <div className="space-y-4">
            {flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    );
}