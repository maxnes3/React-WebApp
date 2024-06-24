// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

// Иницализация входных веременных
export interface DropdownButtonItemProps{
    label: string,
    onClick: () => void,
    toggleDropdown?: () => void
}

export function DropdownButtonItem({ label, onClick, toggleDropdown }: DropdownButtonItemProps){
    // Скрытие выпадающего списка
    const handleOnClick = () => {
        if (toggleDropdown)
            toggleDropdown();
        onClick();
    };

    // Вёрстка компонента
    return (
        <button
            onClick={handleOnClick}
            className={`flex items-center w-full px-4 py-2 text-sm ${colorsPresets.primaryTextBlack} ${colorsPresets.buttonHoverBackgroundSimple}`}
        >
            {label}
        </button>
    );
}