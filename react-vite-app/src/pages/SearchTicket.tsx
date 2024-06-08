// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader.tsx";
import { InputField } from "../components/InputField.tsx";
import { DateField } from "../components/DateField.tsx";
import { ListSelector } from "../components/ListSelector.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";

// Импорт компонентов из React
import { useState, useCallback, FormEvent } from "react";

// Импорт сервисов
import { flightService } from "../services/FlightService.ts";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

// Получение текущей даты
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function SearchTicket() {
  const [searchData, setsearchData] = useState({
    fromCity: 'Москва',
    toCity: '',
    departureDate: getCurrentDate(),
    returnDate: '',
  });

  const handleInputChange = useCallback((field: string, value: string) => {
    setsearchData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const flights = await flightService.searchFlight(
        searchData.fromCity,
        searchData.toCity,
        searchData.departureDate,
        searchData.returnDate
      );
      console.log('Flights:', flights);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
      <div className="flex-grow flex items-center justify-center">
        <div className={`${colorsPresets.primaryBackground} ${colorsPresets.primaryText} p-8 rounded-lg shadow-lg max-w-lg w-full`}>
          <FormHeader />
          <form className="space-y-4">
            <div className="flex space-x-4">
              <InputField
                id="from" label="Откуда"
                placeholder="Откуда"
                onChange={(e) => handleInputChange('fromCity', e.target.value)}
                value={searchData.fromCity}
              />
              <InputField
                id="to" label="Куда"
                placeholder="Куда"
                onChange={(e) => handleInputChange('toCity', e.target.value)}
                value={searchData.toCity}
              />
            </div>
            <div className="flex space-x-4">
              <DateField
                id="departure" label="Дата отправления"
                placeholder="Дата отправления"
                onChange={(e) => handleInputChange('departureDate', e.target.value)}
                value={searchData.departureDate}
              />
              <DateField
                id="return" label="Дата возвращения"
                placeholder="Дата обратно"
                onChange={(e) => handleInputChange('returnDate', e.target.value)}
                value={searchData.returnDate}
              />
            </div>
            <div className="flex items-center justify-between">
              <ListSelector />
              <SubmitButton
                label="Поиск"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
  );
}