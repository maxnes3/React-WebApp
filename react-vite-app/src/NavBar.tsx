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
                <div className={"flex space-x-4 p-4"}>
                    <img src="/login-icon.svg" alt="Войти" className={`h-8 w-8 ${colorsPresets.primaryHeaderText}`}/>
                    <a href="/survey-creation">
                        <img src="/moderator-icon.svg" alt="Модератор"
                             className={`h-8 w-8 ${colorsPresets.primaryHeaderText}`}/>
                    </a>
                    <img src="/operator-icon.svg" alt="Оператор" className={`h-8 w-8 ${colorsPresets.primaryHeaderText}`} />
                </div>
                </div>
            </div>
        </nav>
    );
}