// Импорт стилей
import {colorsPresets} from "../styles/colorsPresets.ts";

export interface DropdownButtonItemProps{
    label: string,
    onClick: () => void
}

export function DropdownButtonItem({ label, onClick }: DropdownButtonItemProps){
    return (
        <button
            onClick={onClick}
            className={`flex items-center w-full px-4 py-2 text-sm ${colorsPresets.primaryTextBlack} ${colorsPresets.buttonHoverBackgroundSimple}`}
        >
            {label}
        </button>
    );
}