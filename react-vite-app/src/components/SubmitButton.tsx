// Импорт компонентов из React
import { FormEvent } from "react";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

// Иницализация входных веременных
interface SubmitButtonProps {
    label: string;
    onClick: (e: FormEvent) => void;
}

export function SubmitButton({ label, onClick }: SubmitButtonProps){
  // Вёрстка компонента
  return (
      <button
        type="submit"
        className={`px-6 py-3 ${colorsPresets.buttonBackground} ${colorsPresets.primaryTextWhite} font-bold rounded-md ${colorsPresets.buttonHoverBackground} focus:outline-none focus:ring-2 ${colorsPresets.buttonFocusRing}`}
        onClick={onClick}
      >
        {label}
      </button>
  );
}