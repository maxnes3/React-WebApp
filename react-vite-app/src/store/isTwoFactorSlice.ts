import { createSlice } from "@reduxjs/toolkit";

// Импорт сервисов
import { localStorageService } from "../services/LocalStorageService";


const isTwoFactorSlice = createSlice({
    name: 'isTwoFactor',
    initialState: {
        isTwoFactor: localStorageService.getIsTwoFactor()
    },
    reducers:{
        setIsTwoFactor(state, action) {
            state.isTwoFactor = !!action.payload;
        }
    }   
});

export const {setIsTwoFactor} = isTwoFactorSlice.actions;

export default isTwoFactorSlice.reducer;