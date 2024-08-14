// Определение типа состояния всего приложения
export interface RootStateTypes {
    isAuth: {
        isAuth: boolean;
    },
    isTwoFactor: {
        isTwoFactor: boolean;
    }
}