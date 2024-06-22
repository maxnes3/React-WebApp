// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader.tsx";
import { ListFlightCard } from "./ListFlightCard.tsx";

import { useEffect } from "react";
import { toast } from "react-toastify";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

interface ListFlightsProps {
    flights: Flight[] | null;
    exception?: string;
    updateFavorites?: () => void;
}

export function ListFlights({ flights, exception, updateFavorites }: ListFlightsProps) {
    useEffect(() => {
        if (flights !== null && flights.length === 0 && !exception) {
            toast('Рейсы по запросу не найдены!', {
                type: 'warning',
                theme: 'light'
            });
        }
    }, [flights, exception]);

    return (
        <div className="space-y-4">
            {exception && flights !== null && flights.length == 0 ? (
                <FormHeader 
                    label={exception}
                    color={colorsPresets.primaryTextBlack}
                />
            ) : (
                flights && flights.length > 0 ? (
                    flights.map((flight) => (
                        <ListFlightCard 
                            key={flight.id} 
                            flight={flight} 
                            updateFavorites={updateFavorites}
                        />
                    ))
                ) : (
                    <span></span>
                )
            )}
        </div>
    );
}
