import { createSlice } from "@reduxjs/toolkit";

// Импорт сервисов
import { localStorageService } from "../services/LocalStorageService";


const isAuthBoolean = () => {
    const token = localStorageService.getAccessToken();
    return !!token; // Приведение к boolean
};

const isAuthSlice = createSlice({
    name: 'isAuth',
    initialState: {
        isAuth: isAuthBoolean(),
    },
    reducers:{
        setIsAuth(state, action) {
            state.isAuth = !!action.payload;
        }
    }
});

export const {setIsAuth} = isAuthSlice.actions;

export default isAuthSlice.reducer;