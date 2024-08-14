import { configureStore } from "@reduxjs/toolkit";

import isAuthReducer from "./isAuthSlice.ts"

// Объявление store и его reducers (конфигурация хранилища)
export default configureStore ({
    reducer: {
        isAuth: isAuthReducer
    }
});