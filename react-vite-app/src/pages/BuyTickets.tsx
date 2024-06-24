// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader";
import { SeatLabel } from "../components/SeatLabel";
import { SubmitButton } from "../components/SubmitButton";
import { CheckboxDefault } from "../components/CheckboxDefault";

// Импорт компонентов из React
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Импорт сервисов
import { ticketService } from "../services/TicketService";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets";

interface SeatWithPosition extends Seat {
    gridRow: number,
    gridColumn: number
}

const calculateGridRow = (index: number): number => {
    return Math.floor((index - 1) / 31) + 1;
};

const calculateGridColumn = (index: number): number => {
    return ((index - 1) % 31) + 1;
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
            const seatsWithPosition = response.map((seat: Seat) => ({
                ...seat,
                gridRow: calculateGridRow(parseInt(seat.seatNumber.split('-')[1], 10)),
                gridColumn: calculateGridColumn(parseInt(seat.seatNumber.split('-')[1], 10)),
            }));
            // Сортировка по последним двум цифрам seatNumber
            seatsWithPosition.sort((a: SeatWithPosition, b: SeatWithPosition) => {
                const aNumber = parseInt(a.seatNumber.split('-')[1], 10);
                const bNumber = parseInt(b.seatNumber.split('-')[1], 10);
                return aNumber - bNumber;
            });
            console.log(seatsWithPosition);
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

    const handleBackToSearch = () => {
        navigate('/');
    };

    const handleReservation = async () => {
        try {
            const data: ReservationDto = {
                reservationTicket: selectedSeats
            };
            await ticketService.reservationTicket(data);
            toast('Билеты забронированы!', {
                type: 'success',
                theme: 'light'
            });
            navigate('/tickets');
        } catch (error) {
            console.error('Error purchasing tickets:', error);
            toast('Ошибка при бронировании билета!', {
                type: 'error',
                theme: 'light'
            });
        }
    };

    const handlePurchase = async () => {
        try {
            const data: ReservationDto = {
                reservationTicket: selectedSeats
            };
            await ticketService.buyTicket(data);
            toast('Билеты куплены!', {
                type: 'success',
                theme: 'light'
            });
            navigate('/tickets');
        } catch (error) {
            console.error('Error purchasing tickets:', error);
            toast('Ошибка при покупке билета!', {
                type: 'error',
                theme: 'light'
            });
        }
    };

    return (
        <div className="container mx-auto p-4 relative flex flex-col">
            <FormHeader label="Выбор мест" color={colorsPresets.primaryTextBlack} />
            <div className="relative flex-1">
                <img src="/airplane-img.png" alt="Seat Map" className="w-full h-auto" />
                <div className="absolute inset-0 grid">
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
            <form className={`${colorsPresets.primaryBackground} ${colorsPresets.primaryTextWhite} p-8 rounded-lg shadow-lg max-w-lg w-full mt-4 flex flex-col`}>
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
                        onClick={handleReservation}
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
