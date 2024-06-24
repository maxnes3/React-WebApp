import { colorsPresets } from "../styles/colorsPresets";

// Иницализация входных веременных
interface SeatLabelProps{
    label: string,
    color: string
}

export function SeatLabel({ label, color }: SeatLabelProps){
    // Вёрстка компонента
    return (
        <div className="flex items-center space-x-2 mb-2">
            <div className={`w-4 h-4 ${color} border`}></div>
            <span className={`${colorsPresets.primaryTextWhite}`}> - {label}</span>
        </div>
    );
}