import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import ProfileService from "../services/ProfileService.ts";
import SurveyService from "../services/SurveyService.ts";
import SurveyCardComponent from "../components/surveys/SurveyCardComponent.tsx";
import {colorsPresets} from "../styles/colorsPresets.ts";
import {SubmitButton} from "../components/SubmitButton.tsx";
import {useNavigate} from "react-router-dom";

export interface UserProfile {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  twoFactor: boolean;
  childMode: boolean;
  childModePassword: string;
}

interface PassedSurveys {
  id: number;
  title: string;
  correctAnswersCount: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    id: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    twoFactor: false as boolean,
    childMode: false as boolean,
    childModePassword: '',
  });
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [passedSurveys, setPassedSurveys] = useState<PassedSurveys[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const response = await ProfileService.getProfileData();
      const profile = response.data;
      setProfile({...profile});
      const responseSurveys = await ProfileService.getPassedSurveys(currentPage, 2);
      const surveys = responseSurveys.data.content;
      setTotalPages(responseSurveys.data.totalPages);
      setPassedSurveys(surveys)
      console.log(surveys);
    };

    getProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'childMode') {
      setShowPasswordInput(checked);
    }
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

  const handlePageChange = async (newPage: number) => {
    if (newPage > totalPages || newPage < 1) return
    setCurrentPage(newPage);
    const response = await ProfileService.getPassedSurveys(newPage, 2);
    console.log(response);
    setPassedSurveys(response.data.content);
  };

  const openSurvey = (id: number) => {
    navigate(`/survey/${id}`);
  };

  if (!passedSurveys) {
    return (
      <div>
        Loading...
      </div>
    );
  }

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
            checked={profile.twoFactor || false}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="twoFactorAuth" className="block text-sm font-medium text-gray-700">
            Включить двухфакторную аутентификацию
          </label>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="childMode"
            id="childMode"
            checked={profile.childMode || false}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="childMode" className="block text-sm font-medium text-gray-700">
            Включить детский режим
          </label>
        </div>
        {showPasswordInput && (
          <div className="mb-4">
            <label htmlFor="childModePassword" className="block text-sm font-medium text-gray-700">
              Пароль для детского режима
            </label>
            <input
              type="childModePassword"
              name="childModePassword"
              id="childModePassword"
              value={profile.childModePassword || ''}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        )}
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-gray text-white rounded-md hover:bg-blue-600"
          >
            Обновить
          </button>
          {/*<button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Удалить аккаунт
          </button>*/}
        </div>
      </form>
      <div className="flex">
        {passedSurveys.map((survey, index) => (
          <div key={index} className="m-2 p-2 border border-gray-300 rounded-md">
            <h2 onClick={() => openSurvey(survey.id)} >{survey.title}</h2>
            <p>Рекорд: {survey.correctAnswersCount}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div className={`mt-2 items-center ${colorsPresets.primaryBackground}`}>
          <SubmitButton onClick={() => handlePageChange(currentPage - 1)}
                        label="Предыдущая"/>
        </div>
        <span className="px-4 py-2">{`Страница ${currentPage} из ${totalPages}`}</span>
        <div className={`mt-2 items-center ${colorsPresets.primaryBackground}`}>
          <SubmitButton onClick={() => handlePageChange(currentPage + 1)}
                        label="Следующая"/>
        </div>
      </div>
    </div>
  );
}