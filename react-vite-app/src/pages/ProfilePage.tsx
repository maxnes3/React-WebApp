import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import ProfileService from "../services/ProfileService.ts";

export interface UserProfile {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  twoFactor: boolean;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    id: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    twoFactor: false,
  });

  useEffect(() => {
    const getProfile = async () => {
      const response = await ProfileService.getProfileData();
      const profile = response.data;
      setProfile({...profile});
    };

    getProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(profile)
    const { id, ...profileData } = profile;

    await ProfileService.updateProfile(profileData);
    // Дополнительные действия после обновления профиля
  };

  const handleDelete = async () => {
    await ProfileService.deleteProfile();
    // Дополнительные действия после удаления профиля
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Профиль пользователя</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Имя
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={profile.name || ''}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Фамилия
          </label>
          <input
            type="text"
            name="surname"
            id="surname"
            value={profile.surname || ''}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Почта
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={profile.email || ''}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={profile.password || ''}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="twoFactor"
            id="twoFactor"
            checked={profile.twoFactor}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="twoFactorAuth" className="block text-sm font-medium text-gray-700">
            Включить двухфакторную аутентификацию
          </label>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-gray text-white rounded-md hover:bg-blue-600"
          >
            Обновить
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Удалить аккаунт
          </button>
        </div>
      </form>
    </div>
  );
}