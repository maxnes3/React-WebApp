// Импорт компонентов из ./components/
import { InputField } from "../components/InputField.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";
import { FormHeader } from "../components/FormHeader.tsx";

// Импорт компонентов из React
import { useState, useEffect, useCallback, FormEvent, SetStateAction } from "react";
import { useNavigate } from 'react-router-dom';

// Импорт framer-motion
import { motion } from "framer-motion";

// Импорт сервисов
import { signInService } from "../services/SignInService.ts";
import { localStorageService } from "../services/LocalStorageService.ts";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";
import { toast } from "react-toastify";

interface AddTwoFactorProps{
    setIsTwoFactor: (e: SetStateAction<boolean>) => void
}

// Добавление двухфакторной авторизации
export function AddTwoFactor({ setIsTwoFactor }: AddTwoFactorProps){
    // Навигация
    const navigate = useNavigate();

    const [twoFactorData, setTwoFactorData] = useState({
        secret: '',
        qrcode: '',
        codeTwoFactor: ''
    });

    // Данные для валидации
    const [errors, setErrors] = useState({
        codeTwoFactor: ''
    });

    const fetchTwoFactor = async () =>{
        try {
            const response = await signInService.getTwoFactorCode();
            setTwoFactorData({
                secret: response.encodedTotpSecret,
                qrcode: response.totpSecretQRCode,
                codeTwoFactor: ''
            });
        } catch (error) {
            console.error('Error two factor:', error);
        }
    };

    useEffect(() => {
        fetchTwoFactor();
    }, []);

    // Функция для изменения данных поиска
    const handleInputChange = useCallback((field: string, value: string) => {
        setTwoFactorData((prevState) => ({
            ...prevState,
            [field]: value,
        }));

        setErrors((prevState) => ({
            ...prevState,
            [field]: '', // Очистка полей с ошибками
        }));
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const data: SubmitTwoFaDto = {
                totpInitialCode: twoFactorData.codeTwoFactor,
                encodedTotpSecret: twoFactorData.secret
            };

            const response = await signInService.submitTwoFactorCode(data);
            console.log(response);
            setIsTwoFactor(true);
            setIsTwoFactor(localStorageService.setIsTwoFactor(true));
            toast('Двухфакторная аунтефикация добавлена!', {
                type: 'success',
                theme: 'light'
            });
            navigate('/');
        } catch (error) {
            console.error('Error two factor:', error);
            toast('Ошибка при добавлении двухфакторной аунтефикации!', {
                type: 'error',
                theme: 'light'
            })
        }
    }

    // Анимация для формы
    const twoFactorFormAnimation = {
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
            initial='hidden'
            whileInView='visible'
            className="flex-grow flex items-center justify-center"
        >
            <motion.div
                variants={twoFactorFormAnimation} 
                className={`${colorsPresets.primaryBackground} ${colorsPresets.primaryTextWhite} p-8 rounded-lg shadow-lg max-w-lg w-full`}
            >
                <FormHeader 
                    label="Инструкция:"
                    color={colorsPresets.primaryTextWhite}
                />
                <div className={`text-l ${colorsPresets.primaryTextWhite} font-bold mb-10`}>
                    <p>1. Отсканируйте QRcode с помощью Google Authefication</p>
                    <p>2. Введите код в поле</p>
                    <p>3. Нажмите "Подтвердить"</p>
                </div>
                <form className="space-y-4">
                    <div className="flex justify-center space-y-4">
                        <img 
                            src={`data:image/png;base64,${twoFactorData.qrcode}`}
                            alt="QR Code"
                            className="h-100 w-100"
                        />
                    </div>
                    <InputField 
                        id="code" label="Код подтверждения"
                        placeholder="code"
                        onChange={(e) => handleInputChange('codeTwoFactor', e.target.value)}
                        value={twoFactorData.codeTwoFactor}
                        error={errors.codeTwoFactor}
                        isPassword={false}
                    />
                    <div className="flex justify-center space-y-4">
                        <SubmitButton
                            label="Подтвердить"
                            onClick={handleSubmit}
                        />
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}