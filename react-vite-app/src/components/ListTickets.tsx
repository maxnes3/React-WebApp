// Импорт компонентов из ./components/
import { ListTicketsCard } from "./ListTicketsCard.tsx";
import { FormHeader } from "./FormHeader";

import { colorsPresets } from "../styles/colorsPresets.ts";

interface ListTicketsProps{
    tickets: Ticket[],
    exception: string
}

export function ListTickets({ tickets, exception }: ListTicketsProps){
    return (
        <div className="space-y-4">
            {tickets !== null && tickets.length > 0 ? (
                tickets.map((ticket) => (
                    <ListTicketsCard 
                        ticket={ticket}
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