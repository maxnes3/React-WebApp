// Импорт компонентов из React
import { ChangeEvent } from "react";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

interface TextAreaProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({ id, label, placeholder, value, onChange }: TextAreaProps){
  return (
    <div className="flex-1">
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
      <textarea
        id={id}
        className={`w-full p-3 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryText} border-none focus:outline-none focus:ring-2 ${colorsPresets.inputFocusRing}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}