// Импорт компонентов из ./components/
import { ListTickets } from "../components/ListTickets.tsx";

// Импорт компонентов из React
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Импорт сервисов
import { ticketService } from "../services/TicketService.ts";

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
            <div className="overflow-auto max-h-[90vh] w-full">
                <ListTickets
                    tickets={tickets}
                    exception={isPurchased && JSON.parse(isPurchased) ? 'Нет пока купленных билетов!' : 'Нет пока забронированных билетов!'}
                />
            </div>
        </div>
    );
}