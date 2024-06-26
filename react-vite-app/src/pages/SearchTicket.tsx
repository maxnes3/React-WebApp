// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader.tsx";
import { InputField } from "../components/InputField.tsx";
import { DateField } from "../components/DateField.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";
import { IconButton } from "../components/IconButton.tsx";
import { ListFlights } from "../components/ListFlights.tsx";

// Импорт компонентов из React
import { useState, useCallback, FormEvent } from "react";
import { toast } from "react-toastify";

// Импорт framer-motion
import { motion } from "framer-motion";

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

  // Функция для обновления departureFlights
  const updateDepartureFlights = (newDepartureFlights: []) => {
    setFlights((prevState) => ({
      ...prevState,
      departureFlights: newDepartureFlights,
    }));
  };

  // Функция для обновления returnFlights
  const updateReturnFlights = (newReturnFlights: []) => {
    setFlights((prevState) => ({
      ...prevState,
      returnFlights: newReturnFlights,
    }));
  };

  const [isConnectedSearch, setIsConnectedSearch] = useState(false);

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
      toast('Заполните все поля!', {
        type: 'warning',
        theme: 'light'
      });
      return;
    }

    try {
      var response;
      if (!isConnectedSearch){
        response = await flightService.searchFlight(
          searchData.fromCity,
          searchData.toCity,
          searchData.departureDate,
          searchData.returnDate
        );
      } else {
        response = await flightService.searchConnectedFlight(
          searchData.fromCity,
          searchData.toCity,
          searchData.departureDate,
          searchData.returnDate
        );
        console.log(response);
      }
      setFlights(response);
      console.log('Flights:', flights);
      if ((flights.departureFlights != null && flights.departureFlights.length > 0) || 
          (flights.returnFlights != null && flights.returnFlights.length > 0))
        toast('Рейсы по запросу найдены!', {
          type: 'success',
          theme: 'light'
        });
    } catch (error) {
      console.error('Error fetching flights:', error);
      toast('Ошибка при запросе к серверу!', {
        type: 'error',
        theme: 'light'
      });
    }
  };

  // Анимация для формы
  const searchFormAnimation = {
    hidden: {
      y: +250,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Вёрстка компонента
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      className="flex-grow flex flex-row items-center justify-center space-x-16"
    >
      <motion.div
        variants={searchFormAnimation} 
        className={`${colorsPresets.primaryBackground} ${colorsPresets.primaryTextWhite} p-8 rounded-lg shadow-lg max-w-lg w-full`}
      >
        <FormHeader 
          label="Найти авиабилеты" 
          color={colorsPresets.primaryTextWhite}
        />
        <form className="space-y-4">
          <div className="flex space-x-4">
            <InputField
              id="from" label="Откуда"
              placeholder="Откуда"
              onChange={(e) => handleInputChange('fromCity', e.target.value)}
              value={searchData.fromCity}
              error={errors.fromCity}
              isPassword={false}
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
              onChange={(e) => handleInputChange('toCity', e.target.value)}
              value={searchData.toCity}
              error={errors.toCity}
              isPassword={false}
            />
          </div>
          <div className="flex space-x-4">
            <DateField
              id="departure" label="Дата отправления"
              placeholder="Дата отправления"
              onChange={(e) => handleInputChange('departureDate', e.target.value)}
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
              onChange={(e) => handleInputChange('returnDate', e.target.value)}
              value={searchData.returnDate}
            />
          </div>
          <div className="flex justify-center space-x-4">
            <IconButton
              icon={!isConnectedSearch ? '/straight-icon.svg' : '/connected-icon.svg'}
              size="8"
              name="switch"
              onClick={() => {setIsConnectedSearch(!isConnectedSearch)}}
            />
            <SubmitButton
              label="Поиск"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </motion.div>
      <div className="flex flex-col space-y-4 overflow-auto max-h-[90vh]">
        <ListFlights 
          flights={flights.departureFlights}
          header={isConnectedSearch ? 'Рейсы с пересадкой' : 'Прямые рейсы'}
          updateFlights={updateDepartureFlights}
        />
        <ListFlights
          flights={flights.returnFlights}
          header="Обратные рейсы"
          updateFlights={updateReturnFlights}
        />
      </div>
    </motion.div>
  );
}