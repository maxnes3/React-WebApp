import { colorsPresets } from "../styles/colorsPresets";

export function FormHeader(){
    return (
        <h1 className={`text-4xl font-bold mb-8 ${colorsPresets.primaryHeaderText}`}>Найти авиабилеты</h1>
    );
}