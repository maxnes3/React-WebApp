interface LinkTextProps {
    link: string,
    label: string
}

export function LinkText({ link, label }: LinkTextProps) {
    return (
        <a href={link}>
            {label}
        </a>
    );
}