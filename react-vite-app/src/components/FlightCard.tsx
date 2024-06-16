import { useState } from "react";
import { IconButton } from "./IconButton.tsx";

interface FlightCardProps {
    flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const departureDate = new Date(flight.departureTime);
    const arrivalDate = new Date(flight.arrivalTime);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }).toUpperCase();
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    const duration = Math.round((arrivalDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60) * 10) / 10;

    const handleExpandButtons = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-col items-center justify-between p-4 rounded-lg shadow-md space-y-4">
            <div className="flex items-center justify-between w-full space-x-4">
                <div className="text-2xl font-bold">{flight.ticketPrice}₽</div>
                <div className="flex flex-col items-center">
                    <div className="text-xl font-bold">
                        {formatTime(departureDate)}
                    </div>
                    <div className="text-sm">
                        {formatDate(departureDate)}
                    </div>
                    <div className="text-sm">
                        {flight.route.origin}
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    <img src="/start-icon.svg" 
                        alt="start_icon" 
                        className={`h-6 w-6`}
                    />
                    <div className="font-bold">
                        {duration} ч в пути
                    </div>
                    <img src="/end-icon.svg" 
                        alt="end_icon" 
                        className={`h-6 w-6`}
                    />
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-xl font-bold">
                        {formatTime(arrivalDate)}
                    </div>
                    <div className="text-sm">
                        {formatDate(arrivalDate)}
                    </div>
                    <div className="text-sm">
                        {flight.route.destination}
                    </div>
                </div>
                <IconButton 
                    icon="/plus-icon.svg" 
                    size="8"
                    name="plus"
                    onClick={handleExpandButtons}
                />
            </div>
            {isExpanded && (
                <div className="flex space-x-2">
                    <IconButton 
                        icon="/share-icon.svg" 
                        size="6" 
                        name="share"
                        onClick={() => console.log("Share")}
                        text="Поделиться"
                    />
                    <IconButton 
                        icon="/favorite-icon.svg"
                        size="6"  
                        name="favorite"
                        onClick={() => console.log("Favorite")}
                        text="Избраное"
                    />
                    <IconButton 
                        icon="/buy-icon.svg"
                        size="6" 
                        name="buy"
                        onClick={() => console.log("Buy")}
                        text="Купить"
                    />
                </div>
            )}
        </div>
    );
}