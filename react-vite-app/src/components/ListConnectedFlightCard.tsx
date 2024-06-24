import { IconButton } from "./IconButton.tsx";

import { localStorageService } from "../services/LocalStorageService.ts";

import { colorsPresets } from "../styles/colorsPresets.ts";

// Иницализация входных веременных
interface ListConnectedFlightCardProps{
    flights: Flight[]
}

export function ListConnectedFlightCard({ flights }: ListConnectedFlightCardProps){
    const departurePoint = flights[0];
    const arrivalPoint = flights[-1];

    const departureDate = new Date(departurePoint.departureTime);
    const arrivalDate = new Date(arrivalPoint.arrivalTime);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }).toUpperCase();
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    const durationHours = Math.floor((arrivalDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60));
    const durationMinutes = Math.round(((arrivalDate.getTime() - departureDate.getTime()) % (1000 * 60 * 60)) / (1000 * 60));

    const totalTicketPrice = flights.reduce((accumulator, currentFlight) => {
        return accumulator + currentFlight.ticketPrice;
    }, 0);

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className={`flex justify-between p-4 bg-googleBlue ${colorsPresets.primaryTextWhite} border-b`}>
                <div className="text-3xl font-bold">{totalTicketPrice} ₽</div>
            </div>
            <div className="flex justify-between space-x-4 ml-8 mr-8 mt-4 mb-8">
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">
                        {formatTime(departureDate)}
                    </div>
                    <div className="text-sm">
                        {formatDate(departureDate)}
                    </div>
                    <div className="text-sm">
                        {departurePoint.route.origin}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center relative">
                    <div className="absolute -top-0.5 text-xs mt-4 font-bold">
                        В пути: {durationHours}ч {durationMinutes}м
                    </div>
                    <div className="flex items-center space-x-2">
                        <img src="/start-icon.svg" 
                            alt="start_icon" 
                            className="h-4 w-4"
                        />
                        <div className="border-t-2 border-gray-400 w-32"></div>
                        <img src="/end-icon.svg" 
                            alt="end_icon" 
                            className="h-4 w-4"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">
                        {formatTime(arrivalDate)}
                    </div>
                    <div className="text-sm">
                        {formatDate(arrivalDate)}
                    </div>
                    <div className="text-sm">
                        {arrivalPoint.route.destination}
                    </div>
                </div>
            </div>
            <div className="p-4 bg-gray-100 border-t">
                <div className="flex justify-end space-x-2 items-end">
                    {/* {localStorageService.getAccessToken() ? (
                        <IconButton 
                        icon={inFavorite ? "/remove-icon.svg" : "/favorite-icon.svg"}
                        size="6"  
                        name="favorite"
                        onClick={handleAddToFavorite}
                        text="Избраное"
                    />) : (
                        <span></span>
                    )}
                    <IconButton 
                        icon="/buy-icon.svg"
                        size="6" 
                        name="buy"
                        onClick={handleSetBuyFlight}
                        text="Купить"
                    /> */}
                </div>
            </div>
        </div>
    );
}