import { colors } from "../styles/colors.ts";

export function ListSelector(){
    return (
        <div>
            <span className="block mb-2">Пассажиры и класс</span>
            <select className={`p-3 rounded-md ${colors.inputBackground} ${colors.primaryText} border-none focus:outline-none focus:ring-2 ${colors.buttonFocusRing}`}>
                <option>1 пассажир, эконом</option>
            </select>
        </div>
    );
}