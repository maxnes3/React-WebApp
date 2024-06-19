import {FormEvent, useState} from "react";
import {InputField} from "../../components/InputField.tsx";
import RouteService from "../../services/RouteService.ts";

export default function RouteCreationPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [errors, setErrors] = useState({
    origin: '',
    destination: '',
    distance: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const newRoute = { origin, destination, distance: parseFloat(distance) };
    await RouteService.create(newRoute)
  }

  const validateForm = () => {
    const newErrors = {
      origin: origin.length === 0 ? "Введите название" : '',
      destination: destination.length === 0 ? "Введите название" : '',
      distance: distance.length === 0 || !parseFloat(distance) ? "Введите расстояние" : ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Создание маршрута</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <InputField
            id="origin" label="Откуда"
            placeholder="Москва"
            onChange={(e) => setOrigin(e.target.value)}
            value={origin}
            error={errors.origin}
          />
        </div>
        <div className="mb-4">
          <InputField
            id="destination" label="Куда"
            placeholder="Ульяновск"
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            error={errors.destination}
          />
        </div>
        <div className="mb-4">
          <InputField
            id="distance" label="Расстояние"
            placeholder="150"
            onChange={(e) => setDistance(e.target.value)}
            value={distance}
            error={errors.distance}
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