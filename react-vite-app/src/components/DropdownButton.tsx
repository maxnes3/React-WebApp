// Импорт стилей
import {colorsPresets} from "../styles/colorsPresets.ts";

// Импорт компонентов из ./components/
import {DropdownButtonItem, DropdownButtonItemProps} from "./DropdownButtonItem.tsx";

// Импорт компонентов из React
import {useEffect, useRef, useState} from "react";

// Импорт сервисов
import {localStorageService} from '../services/LocalStorageService.ts';

interface DropdownButtonProps {
    icon: string,
    list: DropdownButtonItemProps[]
}

export function DropdownButton({ icon, list }: DropdownButtonProps){
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownWidth, setDropdownWidth] = useState<number | undefined>(undefined);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (buttonRef.current) {
            setDropdownWidth(buttonRef.current.offsetWidth);
        }
    }, []);

    return (
        <div className="relative inline-block text-left">
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className={`inline-flex items-center space-x-2 ${colorsPresets.primaryTextBlack} text-l font-bold rounded-md`}
            >
                <img src={icon} 
                    alt='alt' 
                    className={`h-8 w-8`}
                />
                {localStorageService.getEmailFromToken()}
            </button>
            {isOpen && (
                <div
                    style={{ width: dropdownWidth ?? 'auto' }}
                    className={`origin-top-right absolute py-1 right-0 mt-2 rounded-md shadow-lg ${colorsPresets.buttonBackgroundSimple}`}
                >
                    {list.map((item, index) => (
                        <DropdownButtonItem
                            key={index}
                            label={item.label}
                            onClick={item.onClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
