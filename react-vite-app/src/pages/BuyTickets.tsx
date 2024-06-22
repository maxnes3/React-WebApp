// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader";
import { SeatLabel } from "../components/SeatLabel";
import { SubmitButton } from "../components/SubmitButton";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ticketService } from "../services/TicketService";
import { CheckboxDefault } from "../components/CheckboxDefault";

import { colorsPresets } from "../styles/colorsPresets";

interface SeatWithPosition extends Seat {
    gridRow: number,
    gridColumn: number
}

const calculateGridRow = (index: number): number => {
    return Math.floor(index / 31) + 1;
};

const calculateGridColumn = (index: number): number => {
    return (index % 31) + 1;
};

export function BuyTickets() {
    // Навигация
    const navigate = useNavigate();
    
    const { flightId } = useParams<{ flightId: string }>();

    const [seats, setSeats] = useState<SeatWithPosition[]>([]);
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
            const seatsWithPosition = response.map((seat: Seat, index: number) => ({
                ...seat,
                gridRow: calculateGridRow(index),
                gridColumn: calculateGridColumn(index),
            }));
            setSeats(seatsWithPosition);
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

    const handleBackToSearch = () =>{
        navigate('/');
    };

    const handlePurchase = async () => {
        try {
            const data: ReservationDto = {
                reservationTicket: selectedSeats
            };
            await ticketService.buyTicket(data);
            toast('')
        } catch (error) {
            console.error('Error purchasing tickets:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 relative">
            <FormHeader label="Выбор мест" color={colorsPresets.primaryTextBlack} />
            <div className="relative">
                <img src="/airplane-img.png" alt="Seat Map" className="w-full h-auto" />
                <div className="absolute inset-0 grid grid-cols-31 gap-1">
                    {seats.map((seat) => (
                        <div
                            key={seat.seatNumber}
                            className={`p-1 flex items-center justify-center ${seat.isAvailible ? '' : 'opacity-50'}`}
                            style={{ gridRow: seat.gridRow, gridColumn: seat.gridColumn }}
                        >
                            <CheckboxDefault
                                onChange={() => handleSeatSelect(seat.seatNumber)}
                                checked={selectedSeats.includes(seat.seatNumber)}
                                disabled={!seat.isAvailible}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <form className={`${colorsPresets.primaryBackground} ${colorsPresets.primaryTextWhite} p-8 rounded-lg shadow-lg max-w-lg w-full mt-4`}>
                {seatsLabels.map((seat) => (
                    <SeatLabel
                        key={seat.label}
                        label={seat.label}
                        color={seat.color}
                    />
                ))}
                <div className="flex justify-between mt-4">
                    <SubmitButton
                        label="Назад"
                        onClick={handleBackToSearch}
                    />
                    <SubmitButton
                        label="Бронировать"
                        onClick={handleBackToSearch}
                    />
                    <SubmitButton
                        label="Купить"
                        onClick={handlePurchase}
                    />
                </div>
            </form>
        </div>
    );
}
