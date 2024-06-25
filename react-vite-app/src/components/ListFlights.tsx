// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader.tsx";
import { ListFlightCard } from "./ListFlightCard.tsx";
import { DropdownButton } from "./DropdownButton.tsx";

// Импорт из React
import { useEffect } from "react";
import { toast } from "react-toastify";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

// Иницализация входных веременных
interface ListFlightsProps {
    flights: ExtebdedFlight[] | null;
    exception?: string;
    updateFavorites?: () => void;
    header?: string;
    updateFlights?: (e: any) => void;
}

export function ListFlights({ flights, exception, updateFavorites, header, updateFlights }: ListFlightsProps) {
    // Выполнение действий при рендере
    useEffect(() => {
        if (flights !== null && flights.length === 0 && !exception) {
            toast('Рейсы по запросу не найдены!', {
                type: 'warning',
                theme: 'light'
            });
        }
    }, [flights, exception]);

    // Сортировка по возрастанию цены
    const handleSortByPrice = () => {
        if(!flights || !updateFlights){
            return;
        }
        const newFlights = flights.sort((a, b) => a.ticketPrice - b.ticketPrice);
        updateFlights(newFlights);
        toast('Рейсы отсортированны по цене!', {
            type: 'success',
            theme: 'light'
        });
    };

    // Сортировка по возрастанию времени вылета
    const handleSortByDepartureTime = () => {
        if(!flights || !updateFlights){
            return;
        }
        const newFlights = flights.sort((a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime());
        updateFlights(newFlights);
        toast('Рейсы отсортированны по времени вылета!', {
            type: 'success',
            theme: 'light'
        });
    };

    // Сортировка по возрастанию времени в пути
    const handleSortByDuration = () => {
        if(!flights || !updateFlights){
            return;
        }
        const newFlights = flights.sort((a, b) => {
            const durationA = new Date(a.arrivalTime).getTime() - new Date(a.departureTime).getTime();
            const durationB = new Date(b.arrivalTime).getTime() - new Date(b.departureTime).getTime();
            return durationA - durationB;
        });
        updateFlights(newFlights);
        toast('Рейсы отсортированны по времени в пути!', {
            type: 'success',
            theme: 'light'
        });
    };

    // Список с сортировками полётов
    const filterList = [
        {
            label: 'Цена',
            onClick: handleSortByPrice
        },
        {
            label: "Вылет",
            onClick: handleSortByDepartureTime
        },
        {
            label: "Время",
            onClick: handleSortByDuration
        }
    ];

    // Вёрстка компонента
    return (
        <div className="space-y-4">
            {header && flights && flights.length > 0 && (
                <div className="flex justify-between">
                    <div className="text-xl font-bold">{header}</div>
                    {flights.length > 1 && (
                        <DropdownButton
                            icon='/filter-icon.svg'
                            label='Сортировать'
                            color={colorsPresets.primaryTextBlack}
                            list={filterList}
                        />
                    )}
                </div>
            )}
            {exception && flights && flights.length == 0 ? (
                <FormHeader 
                    label={exception}
                    color={colorsPresets.primaryTextBlack}
                />
            ) : (
                flights && flights.length > 0 && (
                    flights.map((flight, index) => (
                        <ListFlightCard 
                            key={flight.id} 
                            flight={flight} 
                            updateFavorites={updateFavorites}
                            delayAnimation={index + 1}
                        />
                    ))
                )
            )}
        </div>
    );
}
