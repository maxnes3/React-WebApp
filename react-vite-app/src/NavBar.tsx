// Импорт стилей
import { colorsPresets } from "./styles/colorsPresets.ts";

export function Navbar(){
    return (
        <nav className={`w-full ${colorsPresets.primaryBackground} ${colorsPresets.primaryText} p-4 shadow-md`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className={`text-2xl ${colorsPresets.primaryText} font-bold`}>
                    SkyWingsExpress
                </div>
                <div>
                {/* Можно добавить другие элементы навигации здесь */}
                <div>
                    <img src="/login-icon.svg" alt="Войти" className={`h-8 w-8 ${colorsPresets.primaryHeaderText}`} />
                </div>
                </div>
            </div>
        </nav>
    );
}