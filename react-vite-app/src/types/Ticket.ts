interface Ticket{
    id: number,
    ticketNumber: string,
    flight: Flight,
    ownerId: number,
    finalPrice: number,
    isBuy: boolean,
    isCheckedIn: boolean
}