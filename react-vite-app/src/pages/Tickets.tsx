// Импорт компонентов из ./components/
import {ListTickets} from "../components/ListTickets";

// Импорт компонентов из React
import {useEffect, useState} from "react";

// Импорт сервисов
import {ticketService} from "../services/TicketService";

export function Tickets(){
    const [tickets, setTickets] = useState([]);

    const fetchTickets = async () => {
        try {
            const response = await ticketService.getUserBuyTicket();
            setTickets(response);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    return (
        <div className="flex-grow flex flex-col items-center justify-center space-y-8">
            <ListTickets
                tickets={tickets}
            />
        </div>
    );
}