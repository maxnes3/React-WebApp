import { colorsPresets } from "../styles/colorsPresets.ts";

interface SubmitButtonProps {
    label: string;
}

export function SubmitButton({label}: SubmitButtonProps){
    return (
        <button
            type="submit"
            className={`px-6 py-3 ${colorsPresets.buttonBackground} ${colorsPresets.buttonText} font-bold rounded-md ${colorsPresets.buttonHoverBackground} focus:outline-none focus:ring-2 ${colorsPresets.buttonFocusRing}`}
        >
            {label}
        </button>
    );
}