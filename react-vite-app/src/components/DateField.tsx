// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

interface DateFieldProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export function DateField({ id, label, placeholder, value, onChange }: DateFieldProps){
    return (
        <div className="flex-1">
            <label htmlFor={id} className="block mb-2">
                {label}
            </label>
            <input
                type="date"
                id={id}
                className={`w-full p-3 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryText} border-none focus:outline-none focus:ring-2 ${colorsPresets.inputFocusRing}`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}