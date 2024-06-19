// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader.tsx";

// Импорт компонентов из React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Импорт сервисов
import { ticketService } from "../services/TicketService.ts";
import { colorsPresets } from "../styles/colorsPresets";

export function BuyTickets(){
    const { flightId } = useParams<{ flightId: string }>();
    
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const fetchTickets = async (flightId: string) => {
        try {
            const response = await ticketService.getTicketOnFlight(flightId);
            console.log(response);
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
                    <div key={seat.seatNumber} className={`p-2 ${seat.isAvailible ? '' : 'opacity-50'}`}>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                disabled={!seat.isAvailible}
                                checked={selectedSeats.includes(seat.seatNumber)}
                                onChange={() => handleSeatSelect(seat.seatNumber)}
                                className="form-checkbox"
                            />
                        </label>
                    </div>
                ))}
            </div>
            <button
                onClick={handlePurchase}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
                Purchase
            </button>
        </div>
    );
}