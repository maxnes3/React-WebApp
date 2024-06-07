// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

interface InputFieldProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}
  
export function InputField({ id, label, placeholder, value, onChange }: InputFieldProps){
    return (
        <div className="flex-1">
            <label htmlFor={id} className="block mb-2">
                {label}
            </label>
            <input
                type="text"
                id={id}
                className={`w-full p-3 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryText} border-none focus:outline-none focus:ring-2 ${colorsPresets.inputFocusRing}`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}