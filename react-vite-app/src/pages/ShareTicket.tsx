// Импорт компонентов из ./components/
import { ListTicketsCard } from "../components/ListTicketsCard";
import { FormHeader } from "../components/FormHeader";

// Импорт компонентов из React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Импорт сервисов
import { ticketService } from "../services/TicketService";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets";

// Показывает билет по ссылке
export function ShareTicket(){
    const { ticketNumber } = useParams<{ ticketNumber: string }>();

    const [ticket, setTicket] = useState<Ticket>();

    const fetchTicket = async () => {
        try {
            if (ticketNumber){
                const response = await ticketService.getTicketByNumber(ticketNumber);
                setTicket(response);
            }
        } catch (error) {
            console.error('Error fetching ticket:', error);
        }
    };

    // Выполнение действий при рендере
    useEffect(() => {
        fetchTicket();
    }, []);

    // Вёрстка компонента
    return (
        <div className="flex-grow flex flex-col items-center justify-center">
            {ticket ? (
                <ListTicketsCard 
                    ticket={ticket}
                    delayAnimation={1}
                />
            ) : (
                <FormHeader 
                    label='Ошибка при получении билета!'
                    color={colorsPresets.primaryTextBlack} 
                />
            )}
        </div>
    );
}