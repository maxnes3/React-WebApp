import {FormEvent, useEffect, useState} from "react";
import {InputField} from "../../components/InputField.tsx";
import {colorsPresets} from "../../styles/colorsPresets.ts";
import RouteService from "../../services/RouteService.ts";
import {flightService} from "../../services/FlightService.ts";

interface Route {
  id: number;
  origin: string;
  destination: string;
}

export default function FlightCreationPage() {
  const [routeId, setRouteId] = useState(0);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [arrivalTime, setArrivalTime] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [totalSeats, setTotalSeats] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const [errors, setErrors] = useState({
    routeId: '',
    arrivalTime: '',
    departureTime: '',
    totalSeats: '',
    ticketPrice: '',
    discountPercentage: ''
  });

  useEffect(() => {
    const fetchRoutes = async () => {
      const routes = await RouteService.getRoutes();
      console.log(routes);
      setRoutes(routes);
    }

    fetchRoutes();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const newFlight = { routeId, arrivalTime, departureTime, totalSeats, ticketPrice, discountPercentage};
    console.log(newFlight)
    await flightService.create(newFlight)
  }

  const validateForm = () => {
    const newErrors = {
      routeId: routeId === 0 ? "Выберите направление" : '',
      arrivalTime: arrivalTime.length === 0 || new Date(arrivalTime).getTime() <= Date.now() ? "Выберите корректную дату" :
        (new Date(arrivalTime).getTime() <= new Date(departureTime).getTime()) ? 'Проверьте дату отправки и прибытия' : '',
      departureTime: departureTime.length === 0 || new Date(departureTime).getTime() <= Date.now() ? "Выберите корректную дату" :
        (new Date(arrivalTime).getTime() <= new Date(departureTime).getTime()) ? 'Проверьте дату отправки и прибытия' : '',
      totalSeats: totalSeats <= 0 ? "Введите количество мест" : '',
      ticketPrice: ticketPrice <= 0 ? "Введите цену билета" : '',
      discountPercentage: discountPercentage < 0 || discountPercentage > 100 ? "Введите скидку" : '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Создание рейса</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <select className={`p-3 mb-2 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryTextWhite} 
        border-none focus:outline-none focus:ring-2 ${colorsPresets.buttonFocusRing}
        block w-full`}
                  value={routeId}
                  onChange={(e) => setRouteId(Number(e.target.value))}
          >
            <option value="">Направление</option>
            {routes.map(route => (
              <option key={route.id} value={route.id}>
                из {route.origin} в {route.destination}
              </option>
            ))}
          </select>
          {errors.routeId && <p className={`mt-2 ${colorsPresets.errorText} font-bold text-sm`}>{errors.routeId}</p>}
        </div>
        <div className="mb-4">
          <div className="flex-1">
            <label htmlFor={departureTime} className={`block mb-2 ${colorsPresets.primaryTextBlack} font-bold`}>
              {"Время отправления"}
            </label>
            <input
              type="datetime-local"
              id={departureTime}
              className={`w-full p-3 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryTextWhite} border-none focus:outline-none focus:ring-2 ${colorsPresets.inputFocusRing}`}
              placeholder={Date.now().toString()}
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
            />
            {errors.departureTime && <p className={`mt-2 ${colorsPresets.errorText} font-bold text-sm`}>{errors.departureTime}</p>}
          </div>
        </div>
        <div className="mb-4">
          <div className="flex-1">
            <label htmlFor={arrivalTime} className={`block mb-2 ${colorsPresets.primaryTextBlack} font-bold`}>
              {"Время прибытия"}
            </label>
            <input
              type="datetime-local"
              id={arrivalTime}
              className={`w-full p-3 rounded-md ${colorsPresets.inputBackground} ${colorsPresets.primaryTextWhite} border-none focus:outline-none focus:ring-2 ${colorsPresets.inputFocusRing}`}
              placeholder={Date.now().toString()}
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
            {errors.arrivalTime && <p className={`mt-2 ${colorsPresets.errorText} font-bold text-sm`}>{errors.arrivalTime}</p>}
          </div>
        </div>
        <div className="mb-4">
          <InputField
            id="totalSeats" label="Количество мест"
            placeholder="150"
            onChange={(e) => setTotalSeats(parseInt(e.target.value))}
            value={totalSeats || 0}
            error={errors.totalSeats}
          />
        </div>
        <div className="mb-4">
          <InputField
            id="ticketPrice" label="Цена билета"
            placeholder="150"
            onChange={(e) => setTicketPrice(parseInt(e.target.value))}
            value={ticketPrice || 0}
            error={errors.ticketPrice}
          />
        </div>
        <div className="mb-4">
          <InputField
            id="discountPercentage" label="Размер скидки"
            placeholder="10"
            onChange={(e) => setDiscountPercentage(parseInt(e.target.value))}
            value={discountPercentage || 0}
            error={errors.discountPercentage}
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray text-white rounded-md hover:bg-blue-600"
          >
            Создать
          </button>
        </div>
      </form>
    </div>
  );
}