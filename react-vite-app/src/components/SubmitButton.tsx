import { colors } from '../styles/colors.ts';

interface SubmitButtonProps {
    label: string;
}

export function SubmitButton({label}: SubmitButtonProps){
    return (
        <button
            type="submit"
            className={`px-6 py-3 ${colors.buttonBackground} ${colors.buttonText} font-bold rounded-md ${colors.buttonHoverBackground} focus:outline-none focus:ring-2 ${colors.buttonFocusRing}`}
        >
            {label}
        </button>
    );
}