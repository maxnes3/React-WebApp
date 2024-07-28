// Импорт компонентов из ./components/
import { ListTicketsCard } from "./ListTicketsCard.tsx";
import { FormHeader } from "./FormHeader";
import { DropdownButtonItemProps } from "./DropdownButtonItem.tsx";
import { DropdownButton } from "./DropdownButton.tsx";

import { colorsPresets } from "../styles/colorsPresets.ts";

// Иницализация входных веременных
interface ListTicketsProps{
    tickets: Ticket[],
    exception: string,
    header?: string,
    list?: DropdownButtonItemProps[]
}

export function ListTickets({ tickets, exception, header, list }: ListTicketsProps){
    // Вёрстка компонента
    return (
        <div className="space-y-4">
            {header && (
                <div className="flex justify-between">
                    <div className="text-xl font-bold">{header}</div>
                    {list && tickets.length > 1 && (
                        <DropdownButton
                            icon='/filter-icon.svg'
                            label='Выбрать категорию'
                            color={colorsPresets.primaryTextBlack}
                            list={list}
                        />
                    )}
                </div>
            )}
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