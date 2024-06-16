import {colorsPresets} from "../styles/colorsPresets.ts";

interface RemoveButtonProps {
  label: string;
  onClick: () => void;
  className: string;
}

export function RemoveButton({ label, onClick, className }: RemoveButtonProps){
  return (
    <button
      className={`px-6 py-3 ${className} ${colorsPresets.buttonRemoveBackground} 
          ${colorsPresets.buttonRemoveText} font-bold rounded-md 
          ${colorsPresets.buttonRemoveHoverBackground} focus:outline-none 
          focus:ring-2 ${colorsPresets.buttonRemoveFocusRing}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}