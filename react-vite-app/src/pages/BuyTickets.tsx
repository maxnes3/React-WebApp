import { FormHeader } from "../components/FormHeader";
import { SeatLabel } from "../components/SeatLabel";
import { SubmitButton } from "../components/SubmitButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ticketService } from "../services/TicketService";
import { colorsPresets } from "../styles/colorsPresets";
import { CheckboxDefault } from "../components/CheckboxDefault";

export function BuyTickets() {
    const { flightId } = useParams<{ flightId: string }>();

    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const seatsLabels = [
        {
        label: 'Свободные места',
        color: ''
        },
        {
        label: 'Занятые места',
        color: ''
        },
    ];

    const fetchTickets = async (flightId: string) => {
        try {
        const response = await ticketService.getTicketOnFlight(flightId);
        setSeats(response);
        } catch (error) {
        console.error('Error fetching favorites:', error);
        }
    };

    useEffect(() => {
        if (flightId) {
            fetchTickets(flightId);
        } else {
            console.error('No flight ID provided');
        }
    }, [flightId]);

    const handleSeatSelect = (seatId: string) => {
        console.log(seatId);
        setSelectedSeats((prevSelectedSeats) =>
            prevSelectedSeats.includes(seatId)
            ? prevSelectedSeats.filter((id) => id !== seatId)
            : [...prevSelectedSeats, seatId]
        );
    };

    const handlePurchase = async () => {
        try {
            const data: ReservationDto = {
                reservationTicket: selectedSeats
            };
            await ticketService.buyTicket(data);
            alert('Tickets purchased successfully!');
        } catch (error) {
            console.error('Error purchasing tickets:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <FormHeader label="Выбор мест" color={colorsPresets.primaryTextBlack} />
            <div className="grid grid-cols-9 gap-2">
                {seats.map((seat) => (
                <div key={seat.seatNumber} className={`p-2 flex items-center space-x-2 ${seat.isAvailible ? '' : 'opacity-50'}`}>
                    <CheckboxDefault
                        onChange={() => handleSeatSelect(seat.seatNumber)}
                        checked={selectedSeats.includes(seat.seatNumber)}
                        disabled={!seat.isAvailible}
                    />
                </div>
                ))}
            </div>
            <form className={`${colorsPresets.primaryBackground} ${colorsPresets.primaryTextWhite} p-8 rounded-lg shadow-lg max-w-lg w-full`}>
                {seatsLabels.map((seat) => (
                <SeatLabel
                    label={seat.label}
                    color={seat.color}
                />
                ))}
                <SubmitButton
                label="Назад"
                onClick={handlePurchase}
                />
                <SubmitButton
                label="Бронировать"
                onClick={handlePurchase}
                />
                <SubmitButton
                label="Купить"
                onClick={handlePurchase}
                />
            </form>
        </div>
    );
}
