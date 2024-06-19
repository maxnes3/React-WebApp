// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader.tsx";
import { InputField } from "../components/InputField.tsx";
import { DateField } from "../components/DateField.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";
import { IconButton } from "../components/IconButton.tsx";
import { ListFlights } from "../components/ListFlights.tsx";

// Импорт компонентов из React
import { useState, useCallback, FormEvent, SetStateAction } from "react";

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

// Поиск авиабилетов
export function SearchTicket() {
  // Дата для поиска билетов
  const [searchData, setSearchData] = useState({
    fromCity: 'CityA',
    toCity: '',
    departureDate: getCurrentDate(),
    returnDate: '',
  });

  // Данные для валидации
  const [errors, setErrors] = useState({
    fromCity: '',
    toCity: '',
  });

  // Состояние для хранения найденных рейсов
  const [flights, setFlights] = useState({
    departureFlights: [],
    returnFlights: [],
  });

  // Валидация формы
  const validateForm = () => {
    const newErrors = {
      fromCity: searchData.fromCity ? '' : 'Выберите город',
      toCity: searchData.toCity ? '' : 'Выберите город',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  // Функция для изменения данных поиска
  const handleInputChange = useCallback((field: string, value: string) => {
    setSearchData((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [field]: '', // Очистка полей с ошибками
    }));
  }, []);

  // Функция для обмена городами
  const handleSwapCities = () => {
    setSearchData((prevState) => ({
      ...prevState,
      fromCity: prevState.toCity,
      toCity: prevState.fromCity,
    }));
  };

  const handleMoveDate = () => {
    setSearchData((prevState) => ({
      ...prevState,
      returnDate: prevState.departureDate
    }));
  };

  // Функция для обращения к springboot серверу
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const flights = await flightService.searchFlight(
        searchData.fromCity,
        searchData.toCity,
        searchData.departureDate,
        searchData.returnDate
      );
      setFlights(flights)
      console.log('Flights:', flights);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center space-y-8">
      <div className={`${colorsPresets.primaryBackground} ${colorsPresets.primaryTextWhite} p-8 rounded-lg shadow-lg max-w-lg w-full`}>
        <FormHeader 
          label="Найти авиабилеты" 
          color={colorsPresets.primaryTextWhite}
        />
        <form className="space-y-4">
          <div className="flex space-x-4">
            <InputField
              id="from" label="Откуда"
              placeholder="Откуда"
              onChange={(e: { target: { value: string; }; }) => handleInputChange('fromCity', e.target.value)}
              value={searchData.fromCity}
              error={errors.fromCity}
            />
            <div className="mt-8">
              <IconButton
                icon="/swap-icon.svg"
                size="8"
                name="swap"
                onClick={handleSwapCities}
              />
            </div>
            <InputField
              id="to" label="Куда"
              placeholder="Куда"
              onChange={(e: { target: { value: string; }; }) => handleInputChange('toCity', e.target.value)}
              value={searchData.toCity}
              error={errors.toCity}
            />
          </div>
          <div className="flex space-x-4">
            <DateField
              id="departure" label="Дата отправления"
              placeholder="Дата отправления"
              onChange={(e: { target: { value: string; }; }) => handleInputChange('departureDate', e.target.value)}
              value={searchData.departureDate}
            />
            <div className="mt-8">
              <IconButton
                icon="/move-icon.svg"
                size="8"
                name="move"
                onClick={handleMoveDate}
              />
            </div>
            <DateField
              id="return" label="Дата возвращения"
              placeholder="Дата обратно"
              onChange={(e: { target: { value: string; }; }) => handleInputChange('returnDate', e.target.value)}
              value={searchData.returnDate}
            />
          </div>
          <div className="flex justify-center space-y-4">
            <SubmitButton
              label="Поиск"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
      <ListFlights 
        flights={flights.departureFlights}
        exception="Прямые рейсы не найдены"
      />
      <ListFlights
        flights={flights.returnFlights}
        exception="Обратные рейсы не найдены"
      />
    </div>
  );
}