import { colorsPresets } from "../styles/colorsPresets.ts";

export function Navbar(){
    return (
        <nav className={`w-full ${colorsPresets.primaryBackground} ${colorsPresets.primaryText} p-4 shadow-md`}>
            <div className="container mx-auto flex justify-between items-center">
            <div className={`text-2xl ${colorsPresets.primaryHeaderText} font-bold`}>
                SkyWingsExpress
            </div>
            <div>
                {/* Можно добавить другие элементы навигации здесь */}
            </div>
            </div>
        </nav>
    );
}