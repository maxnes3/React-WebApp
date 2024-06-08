// Импорт компонентов из React
import { FormEvent } from "react";

import { colorsPresets } from "../styles/colorsPresets.ts";

interface SubmitButtonProps {
    label: string;
    onClick: (e: FormEvent) => void;
}

export function SubmitButton({ label, onClick }: SubmitButtonProps){
    return (
        <button
            type="submit"
            className={`px-6 py-3 ${colorsPresets.buttonBackground} ${colorsPresets.buttonText} font-bold rounded-md ${colorsPresets.buttonHoverBackground} focus:outline-none focus:ring-2 ${colorsPresets.buttonFocusRing}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}