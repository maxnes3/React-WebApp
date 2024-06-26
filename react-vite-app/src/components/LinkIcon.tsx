// Иницализация входных веременных
interface LinkIconProps {
    link: string,
    icon: string,
    name: string
}

export function LinkIcon({ link, icon, name }: LinkIconProps){
    // Вёрстка компонента
    return (
        <a href={link}>
            <img src={icon} 
                alt={name} 
                className={`h-8 w-8`}
            />
        </a>
    );
}