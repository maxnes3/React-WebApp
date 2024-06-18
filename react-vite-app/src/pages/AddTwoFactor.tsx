// Импорт компонентов из ./components/
import { InputField } from "../components/InputField.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";

// Импорт компонентов из React
import { useState, useEffect, useCallback, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';

// Импорт сервисов
import { signInService } from "../services/SignInService.ts";

// Импорт стилей
import { colorsPresets } from "../styles/colorsPresets.ts";

export function AddTwoFactor(){
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
            navigate('/');
        } catch (error) {
            console.error('Error two factor:', error);
        }
    }

    return (
        <div className="flex-grow flex items-center justify-center">
            <div className={`${colorsPresets.primaryBackground} ${colorsPresets.primaryTextWhite} p-8 rounded-lg shadow-lg max-w-lg w-full`}>
                <form className="space-y-4">
                    <img 
                        src={`data:image/png;base64,${twoFactorData.qrcode}`}
                        alt="QR Code"
                        className="h-100 w-100"
                    />
                    <InputField 
                        id="code" label="Код подтверждения"
                        placeholder="code"
                        onChange={(e) => handleInputChange('codeTwoFactor', e.target.value)}
                        value={twoFactorData.codeTwoFactor}
                        error={errors.codeTwoFactor}
                    />
                    <div className="flex justify-center space-y-4">
                        <SubmitButton
                            label="Подтвердить"
                            onClick={handleSubmit}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}