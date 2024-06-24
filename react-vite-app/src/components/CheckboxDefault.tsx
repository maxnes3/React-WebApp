// Иницализация входных веременных
interface CheckboxDefaultProps {
  onChange: () => void,
  checked: boolean,
  disabled: boolean
}

export function CheckboxDefault({ onChange, checked, disabled }: CheckboxDefaultProps) {
  // Вёрстка компонента
  return (
      <input 
          id="checkbox"
          type="checkbox"
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          className="relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-black before:opacity-0 before:transition-opacity checked:border-orange checked:bg-orange checked:before:bg-orange hover:before:opacity-10"
      />
  );
}