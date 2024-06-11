// Импорт компонентов из React
import { ChangeEvent } from "react";

// Импорт стилей
import { colorsPresets } from "../../styles/colorsPresets.ts";

interface InputFieldProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}
  
export function InputField({ id, label, placeholder, value, onChange, error }: InputFieldProps){
    return (
        <div className="flex-1">
            <label htmlFor={id} className={`block mb-2 ${colorsPresets.primaryTextBlack} font-bold`}>
                {label}
            </label>
            <input
                type="text"
                id={id}
                className={`w-full p-3 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryTextWhite} border-none focus:outline-none focus:ring-2 ${error ? colorsPresets.errorFocusRing : colorsPresets.inputFocusRing}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && <p className={`mt-2 ${colorsPresets.errorText} font-bold text-sm`}>{error}</p>}
        </div>
    );
}