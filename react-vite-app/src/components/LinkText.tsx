import { colorsPresets } from "../styles/colorsPresets";

interface LinkTextProps {
    link: string,
    label: string
}

export function LinkText({ link, label }: LinkTextProps) {
    return (
        <a href={link} className={`${colorsPresets.primaryTextBlack}`}>
            {label}
        </a>
    );
}