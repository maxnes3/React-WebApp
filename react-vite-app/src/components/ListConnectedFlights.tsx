// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader.tsx";
import { ListConnectedFlightCard } from "./ListConnectedFlightCard.tsx";

// Импорт из React
import { useEffect } from "react";
import { toast } from "react-toastify";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

// Иницализация входных веременных
interface ListConnectedFlightsProps {
    connectedFlights: Flight[][] | null;
    exception?: string;
}

export function ListConnectedFlights({ connectedFlights, exception }: ListConnectedFlightsProps) {
    // Выполнение действий при рендере
    useEffect(() => {
        if (connectedFlights !== null && connectedFlights.length === 0 && !exception) {
            toast('Рейсы по запросу не найдены!', {
                type: 'warning',
                theme: 'light'
            });
        }
    }, [connectedFlights, exception]);

    // Вёрстка компонента
    return (
        <div className="space-y-4">
            {exception && connectedFlights && connectedFlights.length == 0 ? (
                <FormHeader 
                    label={exception}
                    color={colorsPresets.primaryTextBlack}
                />
            ) : (
                connectedFlights && connectedFlights.length > 0 ? (
                    connectedFlights.map((connectedFlight: any, index: number) => (
                        <ListConnectedFlightCard 
                            key={index} 
                            flights={connectedFlight}
                        />
                    ))
                ) : (
                    <span></span>
                )
            )}
        </div>
    );
}
