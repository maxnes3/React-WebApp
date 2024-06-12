// Импорт компонентов из ./components/
import { LinkIcon } from "./components/LinkIcon.tsx";

// Импорт стилей
import { colorsPresets } from "./styles/colorsPresets.ts";

export function Navbar(){
    return (
        <nav className={`w-full ${colorsPresets.primaryBackground} ${colorsPresets.primaryTextBlack} p-4 shadow-md`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className={`text-2xl ${colorsPresets.primaryTextBlack} font-bold`}>
                    SkyWingsExpress
                </div>
                <div>
                    {/* Можно добавить другие элементы навигации здесь */}
                    <div className={"flex space-x-4 p-4"}>
                        <LinkIcon
                            link="/signin"
                            icon="/login-icon.svg" 
                            name="Войти"
                        />
                        <LinkIcon
                            link="/survey-creation"
                            icon="/moderator-icon.svg" 
                            name="Модератор"
                        />
                        <LinkIcon
                            link="/"
                            icon="/operator-icon.svg" 
                            name="Оператор"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}