// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader.tsx";
import { SeatLabel } from "../components/SeatLabel.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";
import { CheckboxDefault } from "../components/CheckboxDefault.tsx";

// Импорт компонентов из React
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Импорт framer-motion
import { motion } from "framer-motion";

// Импорт сервисов
import { ticketService } from "../services/TicketService.ts";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

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

interface BuyTicketsProps{
    isAuth: boolean
}

// Покупка и бронирование билетов
export function BuyTickets({ isAuth }: BuyTicketsProps) {
    // Навигация
    const navigate = useNavigate();
    
    const { flightId } = useParams<{ flightId: string }>();

    const [seats, setSeats] = useState<SeatWithPosition[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const seatsLabels = [
        { label: 'Свободные места', color: colorsPresets.primaryBackground },
        { label: 'Занятые места', color: 'gray' },
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

    // Выполнение действий при рендере
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

    // Возвращение обратно к поиску
    const handleBackToSearch = (event: FormEvent) => {
        event.preventDefault();
        navigate('/');
    };

    // Оправка выбранных мест для бронирования
    const handleReservation = async (event: FormEvent) => {
        event.preventDefault();

        if (!isAuth){
            toast('Авторизируйтесь чтобы забронировать билет!', {
                type: 'warning',
                theme: 'light'
            });
            return;
        }

        try {
            const data: ReservationDto = {
                reservationTicket: selectedSeats
            };
            await ticketService.reservationTicket(data);
            toast('Билеты забронированы!', {
                type: 'success',
                theme: 'light'
            });
            navigate('/tickets/false');
        } catch (error) {
            console.error('Error purchasing tickets:', error);
            toast('Ошибка при бронировании билета!', {
                type: 'error',
                theme: 'light'
            });
        }
    };

    // Оправка выбранных мест для покупки
    const handlePurchase = async (event: FormEvent) => {
        event.preventDefault();

        if (!isAuth){
            toast('Авторизируйтесь чтобы купить билет!', {
                type: 'warning',
                theme: 'light'
            });
            return;
        }

        try {
            const data: ReservationDto = {
                reservationTicket: selectedSeats
            };
            await ticketService.buyTicket(data);
            toast('Билеты куплены!', {
                type: 'success',
                theme: 'light'
            });
            navigate('/tickets/true');
        } catch (error) {
            console.error('Error purchasing tickets:', error);
            toast('Ошибка при покупке билета!', {
                type: 'error',
                theme: 'light'
            });
        }
    };

    // Анимация появления билета
    const buyFormAnimation = {
        hidden: {
            y: +250,
            opacity: 0
        },
        visible: (custom: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: custom * 0.2 }
        })
    };

    // Вёрстка компонента
    return (
        <motion.div
            initial='hidden'
            whileInView='visible'
            className="container mx-auto p-4 relative flex flex-col items-center justify-center"
        >
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
            <motion.form
                custom={1}
                variants={buyFormAnimation} 
                className={`${colorsPresets.primaryBackground} ${colorsPresets.primaryTextWhite} p-8 rounded-lg shadow-lg max-w-lg w-full mt-4 flex flex-col`}
            >
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
            </motion.form>
        </motion.div>
    );
}
