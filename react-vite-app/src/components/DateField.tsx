// Импорт компонентов из React
import {ChangeEvent} from "react";

// Импорт стилей
import {colorsPresets} from "../styles/colorsPresets.ts";

interface DateFieldProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function DateField({ id, label, placeholder, value, onChange, error }: DateFieldProps){
    return (
        <div className="flex-1">
            <label htmlFor={id} className={`block mb-2 ${colorsPresets.primaryTextBlack} font-bold`}>
                {label}
            </label>
            <input
                type="date"
                id={id}
                className={`w-full p-3 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryTextWhite} border-none focus:outline-none focus:ring-2 ${colorsPresets.inputFocusRing}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
          {error && <p className={`mt-2 ${colorsPresets.errorText} font-bold text-sm`}>{error}</p>}
        </div>
    );
}