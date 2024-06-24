// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

// Иницализация входных веременных
interface LinkTextProps {
    link: string,
    label: string
}

export function LinkText({ link, label }: LinkTextProps) {
    // Вёрстка компонента
    return (
        <a href={link} className={`${colorsPresets.primaryTextWhite}`}>
            {label}
        </a>
    );
}