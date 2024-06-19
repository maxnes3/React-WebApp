// Импорт компонентов из React
import { SetStateAction, useState } from "react";
import { IconButton } from "./IconButton.tsx";
import { useNavigate } from 'react-router-dom';

// Импорт сервисов
import { favoritesService } from "../services/FavoritesService.ts";
import { localStorageService } from "../services/LocalStorageService.ts";

interface ListFlightCardProps {
    flight: Flight,
    updateFavorites?: () => void
}

export function ListFlightCard({ flight, updateFavorites }: ListFlightCardProps) {
    // Навигация
    const navigate = useNavigate();

    const [isExpanded, setIsExpanded] = useState(false);

    const [inFavorite, setInFavorite] = useState(false);

    const departureDate = new Date(flight.departureTime);
    const arrivalDate = new Date(flight.arrivalTime);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }).toUpperCase();
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    const duration = Math.round((arrivalDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60) * 10) / 10;

    const checkFavorite = async () => {
        const token = localStorageService.getAccessToken();
        if(!token)
            return;
        const response = await favoritesService.checkInFavorites(flight.id.toString());
        setInFavorite(response);
    };

    const handleExpandButtons = () => {
        checkFavorite();
        setIsExpanded(!isExpanded);
    };

    const handleAddToFavorite = async () => {
        if (inFavorite) {
            const response = await favoritesService.removeFromFavorites(flight.id.toString());
            console.log(response);
            if (updateFavorites) 
                updateFavorites();
            return;
        }
        const response = await favoritesService.addToFavorites(flight.id.toString());
        console.log(response);
    };


    const handleSetBuyFlight = () => {
        navigate(`/buyticket/${flight.id}`);
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
                        {duration} ч
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
                        icon={inFavorite ? "/remove-icon.svg" : "/favorite-icon.svg"}
                        size="6"  
                        name="favorite"
                        onClick={handleAddToFavorite}
                        text="Избраное"
                    />
                    <IconButton 
                        icon="/buy-icon.svg"
                        size="6" 
                        name="buy"
                        onClick={handleSetBuyFlight}
                        text="Купить"
                    />
                </div>
            )}
        </div>
    );
}