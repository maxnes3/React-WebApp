// Импорт компонентов из ./components/
import {FormHeader} from "../components/FormHeader.tsx";
import {ListFlightCard} from "./ListFlightCard.tsx";

// Импорт стилей
import {colorsPresets} from "../styles/colorsPresets.ts";

interface ListFlightsProps {
    flights: Flight[],
    exception: string,
    updateFavorites?: () => void
}

export function ListFlights({ flights, exception, updateFavorites }: ListFlightsProps) {
    return (
        <div className="space-y-4">
            {flights !== null && flights.length > 0 ? (
                flights.map((flight) => (
                    <ListFlightCard 
                        key={flight.id} 
                        flight={flight} 
                        updateFavorites={updateFavorites}
                    />))
            ) : (
                <FormHeader 
                    label={exception}
                    color={colorsPresets.primaryTextBlack}
                />
            )}
        </div>
    );
}