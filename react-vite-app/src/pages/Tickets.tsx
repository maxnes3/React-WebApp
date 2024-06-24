// Импорт компонентов из ./components/
import { ListTickets } from "../components/ListTickets";

// Импорт компонентов из React
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Импорт сервисов
import { ticketService } from "../services/TicketService";

// Отображает купленные и зарезирвированные билеты
export function Tickets(){
    // State с билетами
    const [tickets, setTickets] = useState([]);

    const { isPurchased } = useParams<{ isPurchased: string }>();

    // Получение данных с бд
    const fetchTickets = async () => {
        try {
            if (isPurchased) {
                if (JSON.parse(isPurchased)){
                    const response = await ticketService.getUserBuyTicket();
                    setTickets(response);
                    return;
                }
                const response = await ticketService.getUserReservedTicket();
                setTickets(response);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    // Выполнение действий при рендере
    useEffect(() => {
        fetchTickets();
    }, []);

    // Вёрстка компонента
    return (
        <div className="flex-grow flex flex-col items-center justify-center space-y-8">
            <ListTickets
                tickets={tickets}
                exception="Нет пока купленных билетов!"
            />
        </div>
    );
}