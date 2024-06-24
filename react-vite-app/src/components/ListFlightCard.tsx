import { IconButton } from "./IconButton.tsx";

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { motion } from "framer-motion";

import { favoritesService } from "../services/FavoritesService.ts";
import { localStorageService } from "../services/LocalStorageService.ts";

import { colorsPresets } from "../styles/colorsPresets.ts";

// Иницализация входных веременных
interface ListFlightCardProps {
    flight: ExtebdedFlight,
    updateFavorites?: () => void
}

// Отображение рейса
export function ListFlightCard({ flight, updateFavorites }: ListFlightCardProps) {
    const navigate = useNavigate();

    const [inFavorite, setInFavorite] = useState(false);

    const [isExpand, setIsExpand] = useState(false);

    const departureDate = new Date(flight.departureTime);
    const arrivalDate = new Date(flight.arrivalTime);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }).toUpperCase();
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    const durationHours = (departureDate: Date, arrivalDate: Date) => {
        return Math.floor((arrivalDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60));
    };

    const durationMinutes = (departureDate: Date, arrivalDate: Date) => {
        return Math.round(((arrivalDate.getTime() - departureDate.getTime()) % (1000 * 60 * 60)) / (1000 * 60));
    };

    // Проверка на наличие в избранном
    const checkFavorite = async () => {
        const token = localStorageService.getAccessToken();
        if(!token) return;
        const response = await favoritesService.checkInFavorites(flight.id.toString());
        setInFavorite(response);
    };

    // Выполнение действий при рендере
    useEffect(() => {
        if (flight.id != null)
            checkFavorite();
    }, []);

    // Добавление/удаление полёта в/из избранное
    const handleAddToFavorite = async () => {
        if (inFavorite) {
            try {
                const response = await favoritesService.removeFromFavorites(flight.id.toString());
                console.log(response);
                if (updateFavorites) updateFavorites();
                checkFavorite();
                toast('Рейс успешно удалён из избранного!', {
                    type: 'success',
                    theme: 'light'
                });
            } catch(error){
                console.error('Error remove favorite:', error);
                toast('Ошибка при удалении из избранного!', {
                    type: 'error',
                    theme: 'light'
                });
            }
            return;
        }

        try {
            const response = await favoritesService.addToFavorites(flight.id.toString());
            console.log(response);
            checkFavorite();
            toast('Рейс успешно добавлен в избранное!', {
                type: 'success',
                theme: 'light'
            });
        } catch(error){
            console.error('Error add favorite:', error);
            toast('Ошибка при добавлении в избранное!', {
                type: 'error',
                theme: 'light'
            });
        }
    };

    const handleSetBuyFlight = () => {
        navigate(`/buyticket/${flight.id}`);
    };

    // Анимация при Expand = true
    const expandAnimation = {
        hidden: {
            x: -100,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1
        }
    };

    // Вёрстка компонента
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            variants={expandAnimation}
            className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden"
        >
            <div className={`flex justify-between p-4 bg-googleBlue ${colorsPresets.primaryTextWhite} border-b`}>
                <div className="text-3xl font-bold">{flight.ticketPrice} ₽</div>
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
                        {flight.route.origin}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center relative">
                    <div className="absolute -top-0.5 text-xs mt-4 font-bold">
                        В пути: {durationHours(new Date(flight.departureTime), new Date(flight.arrivalTime))}ч {durationMinutes(new Date(flight.departureTime), new Date(flight.arrivalTime))}м
                    </div>
                    <div className="flex items-center space-x-2">
                        <img src="/start-icon.svg" 
                            alt="start_icon" 
                            className="h-4 w-4"
                        />
                        <div className="border-t-2 w-32"></div>
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
                        {flight.route.destination}
                    </div>
                </div>
            </div>
            {isExpand && 
                flight.flightIn.map((item) => (
                    <div className="flex justify-between space-x-4 ml-8 mr-8 mt-4 mb-8 p-4 border-t">
                        <div className="flex flex-col items-center">
                            <div className="text-2xl font-bold">
                                {formatTime(new Date(item.departureTime))}
                            </div>
                            <div className="text-sm">
                                {formatDate(new Date(item.departureTime))}
                            </div>
                            <div className="text-sm">
                                {item.route.origin}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center relative">
                            <div className="absolute -top-0.5 text-xs mt-4 font-bold">
                                В пути: {durationHours(new Date(item.departureTime), new Date(item.arrivalTime))}ч {durationMinutes(new Date(item.departureTime), new Date(item.arrivalTime))}м
                            </div>
                            <div className="flex items-center space-x-2">
                                <img src="/start-icon.svg" 
                                    alt="start_icon" 
                                    className="h-4 w-4"
                                />
                                <div className="border-t-2 w-32"></div>
                                <img src="/end-icon.svg" 
                                    alt="end_icon" 
                                    className="h-4 w-4"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-2xl font-bold">
                                {formatTime(new Date(item.arrivalTime))}
                            </div>
                            <div className="text-sm">
                                {formatDate(new Date(item.arrivalTime))}
                            </div>
                            <div className="text-sm">
                                {item.route.destination}
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className="p-4 border-t">
                <div className={`flex ${flight.flightIn != null && flight.flightIn.length > 0 ? 'justify-between' : 'justify-end space-x-2 items-end'}`}>
                    {flight.flightIn != null && flight.flightIn.length > 0 && (
                        <IconButton 
                        icon={isExpand ? "/visibility-off-icon.svg" : "/visibility-icon.svg"}
                        size="6"  
                        name="Expand"
                        onClick={() => {setIsExpand(!isExpand)}}
                        text={isExpand ? 'Скрыть' : 'Подробнее'} />
                    )}
                    {localStorageService.getAccessToken() && (
                        <IconButton 
                        icon={inFavorite ? "/remove-icon.svg" : "/favorite-icon.svg"}
                        size="6"  
                        name="favorite"
                        onClick={handleAddToFavorite}
                        text="Избраное" />
                    )}
                    <IconButton 
                        icon="/buy-icon.svg"
                        size="6" 
                        name="buy"
                        onClick={handleSetBuyFlight}
                        text="Купить"
                    />
                </div>
            </div>
        </motion.div>
    );
}
