
interface FormHeaderProps{
    label: string,
    color: string,
}

export function FormHeader({ label, color }: FormHeaderProps){
    return (
        <h1 className={`text-4xl font-bold mb-8 ${color}`}>
           {label}
        </h1>
    );
}