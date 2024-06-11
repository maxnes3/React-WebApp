// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

interface FormHeaderProps{
    label: string
}

export function FormHeader({ label }: FormHeaderProps){
    return (
        <h1 className={`text-4xl font-bold mb-8 ${colorsPresets.primaryTextWhite}`}>
           {label}
        </h1>
    );
}