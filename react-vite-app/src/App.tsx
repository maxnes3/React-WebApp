// Импорт компонентов из ./components/
import { FormHeader } from "./components/FormHeader.tsx";
import { InputField } from "./components/InputField.tsx";
import { DateField } from "./components/DateField.tsx";
import { ListSelector } from "./components/ListSelector.tsx";
import { SubmitButton } from "./components/SubmitButton.tsx";
import { Navbar } from "./NavBar.tsx";

// Импорт компонентов из React
import { useState } from "react";

// Импорт стилей
import { colorsPresets } from "./styles/colorsPresets.ts";

// Получение текущей даты
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function App() {
  const [fromCity, setFromCity] = useState('Москва');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState(getCurrentDate());
  const [returnDate, setReturnDate] = useState('');

  const handleFromChange = (value: string) => setFromCity(value);
  const handleToChange = (value: string) => setToCity(value);
  const handleDepartureDateChange = (value: string) => setDepartureDate(value);
  const handleReturnDateChange = (value: string) => setReturnDate(value);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className={`${colorsPresets.primaryBackground} ${colorsPresets.primaryText} p-8 rounded-lg shadow-lg max-w-lg w-full`}>
          <FormHeader />
          <form className="space-y-4">
            <div className="flex space-x-4">
              <InputField 
                id="from" label="Откуда" 
                placeholder="Откуда" 
                onChange={handleFromChange} 
                value={fromCity} 
              />
              <InputField 
                id="to" label="Куда" 
                placeholder="Куда" 
                onChange={handleToChange} 
                value={toCity} 
              />
            </div>
            <div className="flex space-x-4">
              <DateField 
                id="departure" label="Дата отправления" 
                placeholder="Дата отправления" 
                onChange={handleDepartureDateChange} 
                value={departureDate} 
              />
              <DateField 
                id="return" label="Дата возвращения" 
                placeholder="Дата обратно" 
                onChange={handleReturnDateChange} 
                value={returnDate} 
              />
            </div>
            <div className="flex items-center justify-between">
              <ListSelector />
              <SubmitButton label="Поиск" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}