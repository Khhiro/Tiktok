import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./reducer/registration"; // Имя файла с reducer'ом

export const store = configureStore({
  reducer: {
    registration: registrationReducer, // Подключение редьюсера
  },
});

// Типизация для RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
