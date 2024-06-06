import { colors } from "../styles/colors.ts";

interface DateFieldProps {
    id: string;
    label: string;
    placeholder: string;
}

export function DateField({ id, label, placeholder }: DateFieldProps){
    return (
        <div className="flex-1">
            <label htmlFor={id} className="block mb-2">
                {label}
            </label>
            <input
                type="date"
                id={id}
                className={`w-full p-3 rounded-md ${colors.inputBackground} ${colors.primaryText} border-none focus:outline-none focus:ring-2 ${colors.inputFocusRing}`}
                placeholder={placeholder}
            />
        </div>
    );
}