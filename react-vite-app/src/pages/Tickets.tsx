// Импорт компонентов из ./components/
import { ListTickets } from "../components/ListTickets.tsx";

// Импорт компонентов из React
import { useState, useEffect } from "react";

// Импорт сервисов
import { ticketService } from "../services/TicketService.ts";

// Отображает купленные и зарезирвированные билеты
export function Tickets(){
    // State с билетами
    const [tickets, setTickets] = useState([]);

    const [isPurchased, setIsPurchased] = useState(true);

    const setIsPurchasedTrue = () => {
        setIsPurchased(true);
        fetchTickets();
    };

    const setIsPurchasedFalse = () => {
        setIsPurchased(false);
        fetchTickets();
    };

    const ticketsList = [
        {
            label: 'Купленные',
            onClick: setIsPurchasedTrue
        },
        {
            label: 'Бронированные',
            onClick: setIsPurchasedFalse
        },
    ];

    // Получение данных с бд
    const fetchTickets = async () => {
        try {
            if (isPurchased){
                const response = await ticketService.getUserBuyTicket();
                setTickets(response);
                return;
            }
            const response = await ticketService.getUserReservedTicket();
            setTickets(response);
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
        <div className="flex-grow flex flex-col items-center justify-center">
            <div className={`flex flex-col items-center space-y-8 ${tickets && tickets.length > 0 && 'overflow-y-auto max-h-[90vh] w-full'}`}>
                <ListTickets
                    tickets={tickets}
                    exception={isPurchased ? 'Нет пока купленных билетов!' : 'Нет пока забронированных билетов!'}
                    header={isPurchased ? 'Купленные билеты' : 'Забронированные билеты'}
                    list={ticketsList}
                />
            </div>
        </div>
    );
}