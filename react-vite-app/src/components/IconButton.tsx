// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

interface IconButtonProps {
    icon: string;
    size: string;
    name: string;
    onClick: () => void;
    text?: string;
}

export function IconButton({ icon, size, name, onClick, text }: IconButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center space-x-2 p-2 rounded ${text ? colorsPresets.buttonBackgroundLight : colorsPresets.backgroundTransparent}`}
        >
            <img src={icon} 
                alt={name} 
                className={`h-${size} w-${size}`}
            />
            {text && <span className={colorsPresets.primaryTextBlack}>{text}</span>}
        </button>
    );
}