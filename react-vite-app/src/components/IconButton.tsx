// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

// Иницализация входных веременных
interface IconButtonProps {
    icon: string;
    size: string;
    name: string;
    onClick: () => void;
    text?: string;
}

export function IconButton({ icon, size, name, onClick, text }: IconButtonProps) {
    // Вёрстка компонента
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