import { DropdownButton } from './DropdownButton.tsx';

import html2pdf from 'html2pdf.js';
import { toast } from 'react-toastify';

import { motion } from "framer-motion";

import { localStorageService } from "../services/LocalStorageService";

import { colorsPresets } from "../styles/colorsPresets";

// Иницализация входных веременных
interface ListTicketsCardProps{
    ticket: Ticket,
    delayAnimation: number
}

export function ListTicketsCard({ ticket, delayAnimation }: ListTicketsCardProps){
    const { flight, ticketNumber, finalPrice, isBuy } = ticket;
    const { flightNumber, route, departureTime } = flight;

    // Опции для отображения времени без секунд
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };

    const handleSaveToPDF = () => {
        const element = document.getElementById(`ticket-card-${ticketNumber}`);
        if (element) {
            try {
                html2pdf()
                    .from(element)
                    .save();
                toast('Билет успешно сохранён в pdf!', {
                    type: 'success',
                    theme: 'light'
            });
            } catch (error) {
                console.error('Error save ticket:', error);
                toast('Ошибка при сохранении билета в pdf!', {
                    type: 'error',
                    theme: 'light'
                });
            }
        }
    };

    const handleCopyHref = () => {
        const url = `http://localhost:5173/share-ticket/${ticketNumber}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                toast('Ссылка успешно скопирована!', {
                    type: 'success',
                    theme: 'light'
                });
            })
            .catch((error) => {
                console.error('Error copying link:', error);
                toast('Ошибка при копировании ссылки!', {
                    type: 'error',
                    theme: 'light'
                });
            });
    };

    const listTicketShare = [
        {
            label: 'Сохранить',
            onClick: handleSaveToPDF
        },
        {
            label: 'Ссылкой',
            onClick: handleCopyHref
        }
    ];

    // Анимация появления билета
    const ticketAnimation = {
        hidden: {
            x: -100,
            opacity: 0
        },
        visible: (custom: number) => ({
            x: 0,
            opacity: 1,
            transition: { delay: custom * 0.2 }
        })
    };

    // Вёрстка компонента
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            custom={delayAnimation}
            variants={ticketAnimation}
            className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden" id={`ticket-card-${ticketNumber}`}
        >
            <div className={`flex justify-between p-4 bg-googleBlue ${colorsPresets.primaryTextWhite} border-b`}>
                <div>
                    <h1 className="text-lg font-semibold">BOARDING PASS</h1>
                    <p className="text-xs text-gray-500">Номер рейса: {flightNumber}</p>
                </div>
                <DropdownButton
                    icon='/share-icon.svg'
                    label='Поделиться'
                    list={listTicketShare}
                />
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
                            <p className="text-xs text-gray">{new Date(departureTime).toLocaleTimeString([], timeOptions)}</p>
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
                        <p className="text-xs text-gray">{new Date(departureTime).toLocaleTimeString([], timeOptions)}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-semibold">STATUS:</p>
                        <p className="text-xs text-gray">{isBuy ? 'ОПЛАЧЕН' : 'НЕ ОПЛАЧЕН'}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-semibold">PRICE:</p>
                        <p className={`text-xl ${colorsPresets.primaryTextBlack}`}>{finalPrice}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}