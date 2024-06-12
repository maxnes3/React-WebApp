// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader.tsx";
import { FlightCard } from "./FlightCard.tsx";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

interface ListFlightsProps {
    flights: Flight[],
    exception: string,
}

export function ListFlights({ flights, exception }: ListFlightsProps) {
    return (
        <div className="space-y-4">
            {flights.length > 0 ? (
                flights.map((flight) => (
                    <FlightCard key={flight.id} flight={flight} />))
            ) : (
                <FormHeader 
                    label={exception}
                    color={colorsPresets.primaryTextBlack}
                />
            )}
        </div>
    );
}