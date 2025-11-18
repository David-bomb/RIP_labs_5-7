import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        // Сюда в будущем можно будет добавлять другие редьюсеры
        // например, cart: cartReducer
    },
});

// Определяем типы для всего состояния и для dispatch, чтобы использовать их в приложении
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;