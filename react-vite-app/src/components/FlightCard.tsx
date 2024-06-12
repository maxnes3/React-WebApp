import { useState } from "react";
import { IconButton } from "./IconButton";

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
            <div className="flex items-center justify-between w-full">
                <div className="text-2xl font-bold">{flight.ticketPrice}₽</div>
                <div className="flex items-center space-x-2">
                    <div className="flex flex-col items-center">
                        <div className="px-2 py-1 rounded-lg">
                            {formatDate(departureDate)}
                        </div>
                        <div className="text-sm">
                            {formatTime(departureDate)} - {formatTime(arrivalDate)}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-sm">
                            {duration} ч в пути / Прямой
                        </div>
                        <div className="text-sm">
                            {flight.route.origin} - {flight.route.destination}
                        </div>
                    </div>
                </div>
                <IconButton 
                    icon="/plus-icon.svg" 
                    name="plus"
                    onClick={handleExpandButtons}
                />
            </div>
            {isExpanded && (
                <div className="flex space-x-4">
                    <IconButton 
                        icon="/share-icon.svg" 
                        name="share"
                        onClick={() => console.log("Share")}
                    />
                    <IconButton 
                        icon="/favorite-icon.svg" 
                        name="favorite"
                        onClick={() => console.log("Favorite")}
                    />
                    <IconButton 
                        icon="/buy-icon.svg" 
                        name="buy"
                        onClick={() => console.log("Buy")}
                    />
                </div>
            )}
        </div>
    );
}