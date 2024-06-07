import { colorsPresets } from "../styles/colorsPresets";

export function ListSelector(){
    return (
        <div>
            <span className="block mb-2">Пассажиры и класс</span>
            <select className={`p-3 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryText} border-none focus:outline-none focus:ring-2 ${colorsPresets.buttonFocusRing}`}>
                <option>1 пассажир, эконом</option>
            </select>
        </div>
    );
}