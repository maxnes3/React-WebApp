// Импорт компонентов из ./components/
import { ListTicketsCard } from "./ListTicketsCard.tsx";
import { FormHeader } from "./FormHeader";

import { colorsPresets } from "../styles/colorsPresets.ts";

// Иницализация входных веременных
interface ListTicketsProps{
    tickets: Ticket[],
    exception: string
}

export function ListTickets({ tickets, exception }: ListTicketsProps){
    // Вёрстка компонента
    return (
        <div className="space-y-4">
            {tickets !== null && tickets.length > 0 ? (
                tickets.map((ticket, index) => (
                    <ListTicketsCard
                        key={ticket.id}
                        ticket={ticket}
                        delayAnimation={index + 1}
                    />
                ))
            ) : (
                <FormHeader 
                    label={exception}
                    color={colorsPresets.primaryTextBlack}
                />
            )}
        </div>
    );
}