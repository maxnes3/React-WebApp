// Импорт компонентов из ./components/
import { ListFlights } from "../components/ListFlights.tsx";

// Импорт компонентов из React
import { useState, useEffect } from "react";

// Импорт сервисов
import { favoritesService } from "../services/FavoritesService.ts";

export function Favorites(){
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = async () => {
        try {
            const response = await favoritesService.getFavorites();
            console.log(response);
            setFavorites(response);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    // Выполнение действий при рендере
    useEffect(() => {
        fetchFavorites();
    }, []);

    // Вёрстка компонента
    return (
        <div className="flex-grow flex flex-col items-center justify-center space-y-8">
            <ListFlights 
                flights={favorites}
                exception="В избранном ничего нет"
                updateFavorites={fetchFavorites}
                header="Избранные рейсы"
                updateFlights={setFavorites}
            />
        </div>
    );
}