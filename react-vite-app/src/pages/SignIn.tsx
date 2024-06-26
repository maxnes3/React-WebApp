// Импорт компонентов из ./components/
import { FormHeader } from "../components/FormHeader.tsx";
import { InputField } from "../components/InputField.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";
import { LinkText } from "../components/LinkText.tsx";
import { SignInGoogleButton } from "../components/SignInGoogleButton.tsx";

// Импорт компонентов из React
import { useState, useCallback, FormEvent, SetStateAction } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Импорт framer-motion
import { motion } from "framer-motion";

// Импорт сервисов
import { signInService } from "../services/SignInService.ts";
import { localStorageService } from '../services/LocalStorageService.ts';

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

interface SignInProps{
    setIsAuth: (e: SetStateAction<boolean>) => void,
    isAuthBoolean: () => boolean,
    setIsTwoFactor: (e: SetStateAction<boolean>) => void
}

// Авторизация
export function SignIn({ setIsAuth, isAuthBoolean, setIsTwoFactor }: SignInProps) {
    // Навигация
    const navigate = useNavigate();

    // Дата для авторизации
    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
        isTwoFactor: false,
        codeTwoFactor: ''
    });

    // Данные для валидации
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        codeTwoFactor: ''
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
            codeTwoFactor: signInData.isTwoFactor ? (signInData.codeTwoFactor ? '' : 'Код авторизации обязателен') : ''
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

    // Добавление токенов в storage и обнавлении данных в App.tsx
    const addTokenToStorage = (authToken: any) => {
        localStorageService.setTokenToStorage(authToken);
        setIsAuth(isAuthBoolean());
        setIsTwoFactor(localStorageService.setIsTwoFactor(signInData.isTwoFactor));
        toast('Вы успешно авторизировались!', {
            type: 'success',
            theme: 'light'
        });
        navigate('/');
    }

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

        // Проверка на наличие двухфакторной аунтефикации
        if (!signInData.isTwoFactor) {
            const data: SignInDto = {
                email: signInData.email,
                password: signInData.password,
            }

            const response = await signInService.checkTwoFactor(data);
            console.log(response);
            
            if (response){
                handleInputChange('isTwoFactor', response);
                return;
            }
            
            // Авторизация без двухфакторной аунтефикации
            try {
                const authToken = await signInService.authorization(data);
                addTokenToStorage(authToken);
            } catch (error) {
                console.error('Error during sign in:', error);
                toast('Ошибка при авторизации!', {
                    type: 'error',
                    theme: 'light'
                });
            }
        }
        
        const data: SignInWithOtp = {
            email: signInData.email,
            password: signInData.password,
            otp: signInData.codeTwoFactor
        }

        // Авторизация с двухфакторной аунтефикации
        try {
            const authToken = await signInService.authorizationTwoFactor(data);
            addTokenToStorage(authToken);
        } catch (error) {
            console.error('Error during sign in:', error);
            toast('Ошибка при авторизации!', {
                type: 'error',
                theme: 'light'
            });
        }
    };

    // Анимация для формы
    const signInFormAnimation = {
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
            className="flex-grow flex items-center justify-center"
        >
            <motion.div
                variants={signInFormAnimation}
                className={`${colorsPresets.primaryBackground} ${colorsPresets.primaryTextWhite} p-8 rounded-lg shadow-lg max-w-lg w-full`}
            >
                <FormHeader 
                    label="Авторизация"
                    color={colorsPresets.primaryTextWhite}
                />
                <form className="space-y-4">
                    <InputField
                        id="email" label="Электронная почта"
                        placeholder="example@gmail.com"
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        value={signInData.email}
                        error={errors.email}
                        isPassword={false}
                    />
                    <InputField
                        id="password" label="Пароль"
                        placeholder="password"
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        value={signInData.password}
                        error={errors.password}
                        isPassword={true}
                    />
                    {signInData.isTwoFactor && (
                        <InputField
                            id="codeTwoFactor" label="Код авторизации"
                            placeholder="codeTwoFactor"
                            onChange={(e) => handleInputChange('codeTwoFactor', e.target.value)}
                            value={signInData.codeTwoFactor}
                            error={errors.codeTwoFactor}
                            isPassword={false}
                        />
                    )}
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
                        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                            <SignInGoogleButton 
                                setIsAuth={setIsAuth} 
                                isAuthBoolean={isAuthBoolean}
                                setIsTwoFactor={setIsTwoFactor}
                            />
                        </GoogleOAuthProvider>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}