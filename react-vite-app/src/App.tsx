import { FormHeader } from "./components/FormHeader.tsx";
import { InputField } from "./components/InputField.tsx";
import { DateField } from "./components/DateField.tsx";
import { ListSelector } from "./components/ListSelector.tsx";
import { SubmitButton } from "./components/SubmitButton.tsx";
import { colors } from "./styles/colors.ts";

export function App() {
  return (
    <>
     <div className={`min-h-screen ${colors.primaryBackground} flex items-center justify-center`}>
        <div className={`${colors.primaryBackground} ${colors.primaryText} p-8 rounded-lg shadow-lg max-w-lg w-full`}>
          <FormHeader />
          <form className="space-y-4">
            <div className="flex space-x-4">
              <InputField id="from" label="Откуда" placeholder="Москва" />
              <InputField id="to" label="Куда" placeholder="Куда" />
            </div>
            <div className="flex space-x-4">
              <DateField id="departure" label="Дата отправления" placeholder="06 июня" />
              <DateField id="return" label="Дата возвращения" placeholder="Дата обратно" />
            </div>
            <div className="flex items-center justify-between">
              <ListSelector />
              <SubmitButton label="Поиск" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}