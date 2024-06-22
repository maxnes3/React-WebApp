import { localStorageService } from "../services/LocalStorageService";
import { colorsPresets } from "../styles/colorsPresets";

interface ListTicketsCardProps{
    ticket: Ticket
}

export function ListTicketsCard({ ticket }: ListTicketsCardProps){
    const { flight, ticketNumber, finalPrice, isCheckedIn } = ticket;
    const { flightNumber, route, departureTime, arrivalTime } = flight;

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className={`flex justify-between p-4 bg-googleBlue ${colorsPresets.primaryTextWhite} border-b`}>
                <div>
                    <h1 className="text-lg font-semibold">BOARDING PASS</h1>
                    <p className="text-xs text-gray-500">Номер рейса: {flightNumber}</p>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="p-4 space-y-4">
                    <div className="flex justify-between space-x-8">
                        <div className="space-y-1">
                            <p className="text-sm font-semibold">NAME:</p>
                            <p className="text-xs text-gray">{localStorageService.getEmailFromToken()}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-semibold">CLASS:</p>
                            <p className="text-xs text-gray">Economy</p>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-8">
                        <div className="space-y-1">
                            <p className="text-sm font-semibold">FROM:</p>
                            <p className="text-xs text-gray">{route.origin}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-semibold">TO:</p>
                            <p className="text-xs text-gray">{route.destination}</p>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-8">
                        <div className="space-y-1">
                            <p className="text-sm font-semibold">DATE:</p>
                            <p className="text-xs text-gray">{new Date(departureTime).toLocaleDateString()}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-semibold">TIME:</p>
                            <p className="text-xs text-gray">{new Date(departureTime).toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <img 
                        alt="swe-logo"
                        src="/swe-logo.png"
                        className="w-64 h-32 object-contain"
                    />
                </div>
            </div>
            <div className="p-4 bg-gray-100 border-t">
                <div className="flex justify-between space-x-10">
                    <div className="space-y-1">
                        <p className="text-sm font-semibold">TICKET №:</p>
                        <p className="text-xs text-gray">{ticketNumber}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-semibold">BOARDING TIME:</p>
                        <p className="text-xs text-gray">{new Date(departureTime).toLocaleTimeString()}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-semibold">PRICE:</p>
                        <p className={`text-xl ${colorsPresets.primaryTextBlack}`}>{finalPrice}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}