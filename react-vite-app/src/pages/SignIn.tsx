// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader.tsx";
import { InputField } from "../components/InputField.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";
import { LinkText } from "../components/LinkText.tsx";
import { SignInGoogleButton } from "../components/SignInGoogleButton.tsx";

// Импорт компонентов из React
import { useState, useCallback, FormEvent } from "react";

// Импорт сервисов
import { signInService } from "../services/SignInService.ts";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

// Авторизация
export function SignIn() {
    // Дата для авторизации
    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    });

    // Данные для валидации
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    // Функция для проверки формата email
    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Валидация формы
    const validateForm = () => {
        const newErrors = {
            email: !signInData.email ? 'Электронная почта обязательна' : (!isEmailValid(signInData.email) ? 'Неверный формат электронной почты' : ''),
            password: signInData.password ? '' : 'Пароль обязателен',
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    // Функция для изменения данных поиска
    const handleInputChange = useCallback((field: string, value: string) => {
        setSignInData((prevState) => ({
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

        const data: SignInDto = {
            email: signInData.email,
            password: signInData.password,
        }

        try {
            const authToken = await signInService.authorization(data);
            localStorage.setItem('access', authToken.access_token)
            localStorage.setItem('refresh', authToken.refresh_token)
        } catch (error) {
            console.error('Error during sign in:', error);
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center">
            <div className={`${colorsPresets.primaryBackground} ${colorsPresets.primaryTextWhite} p-8 rounded-lg shadow-lg max-w-lg w-full`}>
                <FormHeader 
                    label="Авторизация"
                    color={colorsPresets.primaryTextWhite}
                />
                <form className="space-y-4">
                    <div className="space-y-4">
                        <InputField
                            id="email" label="Электронная почта"
                            placeholder="example@gmail.com"
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            value={signInData.email}
                            error={errors.email}
                        />
                        <InputField
                            id="password" label="Пароль"
                            placeholder="password"
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            value={signInData.password}
                            error={errors.password}
                        />
                        <div className="flex justify-center space-y-4">
                            <SubmitButton
                                label="Войти"
                                onClick={handleSubmit}
                            />
                        </div>
                        <div className="flex justify-center space-y-4">
                            <LinkText 
                                label="Ещё нет аккаунта?"
                                link="/signup"
                            />
                        </div>
                        <div className="flex justify-center space-y-4">
                            <SignInGoogleButton />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}