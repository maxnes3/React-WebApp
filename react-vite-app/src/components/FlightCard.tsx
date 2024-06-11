interface FlightCardProps {
    flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
    const departureDate = new Date(flight.departureTime);
    const arrivalDate = new Date(flight.arrivalTime);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }).toUpperCase();
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    const duration = Math.round((arrivalDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60) * 10) / 10;

    return (
        <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg shadow-md space-x-4">
        <div className="text-2xl font-bold">{flight.ticketPrice}₽</div>
        <div className="flex items-center space-x-2">
            <div className="flex flex-col items-center">
            <div className="bg-red-500 px-2 py-1 rounded-lg">
                {formatDate(departureDate)}
            </div>
            <div className="text-sm">
                {formatTime(departureDate)} - {formatTime(arrivalDate)}
            </div>
            </div>
            <div className="flex flex-col items-center">
            <div className="text-sm">
                {duration} ч в пути / Прямой
            </div>
            <div className="text-sm">
                {flight.route.origin} - {flight.route.destination}
            </div>
            </div>
        </div>
        <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 00-1 1v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V4a1 1 0 00-1-1z" />
            </svg>
        </button>
        </div>
    );
}