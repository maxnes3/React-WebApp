// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader.tsx";
import { InputField } from "../components/InputField.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";
import { LinkText } from "../components/LinkText.tsx";

// Импорт компонентов из React
import { useState, useCallback, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';

// Импорт сервисов
import { signInService } from "../services/SignInService.ts";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

// Регистрация
export function SignUp() {
    // Навигация
    const navigate = useNavigate();

    // Дата для регистрации
    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Данные для валидации
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Функция для проверки формата email
    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Валидация формы
    const validateForm = () => {
        const newErrors = {
            email: !signUpData.email ? 'Электронная почта обязательна' : (!isEmailValid(signUpData.email) ? 'Неверный формат электронной почты' : ''),
            password: signUpData.password ? '' : 'Пароль обязателен',
            confirmPassword: !signUpData.confirmPassword ? 'Подтверждение пароля обязательно' : (signUpData.password !== signUpData.confirmPassword ? 'Пароли не совпадают' : ''),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    // Функция для изменения данных поиска
    const handleInputChange = useCallback((field: string, value: string) => {
        setSignUpData((prevState) => ({
            ...prevState,
            [field]: value,
        }));

        setErrors((prevState) => ({
            ...prevState,
            [field]: '', // Очистка полей с ошибками
        }));
    }, []);

    // Функция для обращения к springboot серверу
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const data: SignUpDto = {
            email: signUpData.email,
            password: signUpData.password,
            surname: '',
            name: '',
        }

        try {
            const response = await signInService.registration(data);
            console.log('Response:', response);
            navigate('/signin');
        } catch (error) {
            console.error('Error during sign in:', error);
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center">
            <div className={`${colorsPresets.primaryBackground} p-8 rounded-lg shadow-lg max-w-lg w-full`}>
                <FormHeader 
                    label="Регистрация"
                    color={colorsPresets.primaryTextWhite}
                />
                <form className="space-y-4">
                    <div className="space-y-4">
                        <InputField
                            id="email" label="Электронная почта"
                            placeholder="example@gmail.com"
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            value={signUpData.email}
                            error={errors.email}
                        />
                        <InputField
                            id="password" label="Пароль"
                            placeholder="password"
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            value={signUpData.password}
                            error={errors.password}
                        />
                        <InputField
                            id="confirmPassword" label="Подтверждение"
                            placeholder="confirm"
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            value={signUpData.confirmPassword}
                            error={errors.confirmPassword}
                        />
                        <div className="flex justify-center space-y-4">
                            <SubmitButton
                                label="Подтвердить"
                                onClick={handleSubmit}
                            />
                        </div>
                        <div className="flex justify-center space-y-4">
                            <LinkText 
                                label="Уже есть аккаунт?"
                                link="/signin"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}