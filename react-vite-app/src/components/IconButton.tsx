interface IconButtonProps {
    icon: string;
    name: string;
    onClick: () => void;
}

export function IconButton({ icon, name, onClick }: IconButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
        >
            <img src={icon} 
                alt={name} 
                className={`h-8 w-8`}
            />
        </button>
    );
}