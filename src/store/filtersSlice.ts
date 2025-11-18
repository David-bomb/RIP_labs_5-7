import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Определяем тип для состояния этого слайса
interface FiltersState {
    searchQuery: string;
}

// Начальное состояние
const initialState: FiltersState = {
    searchQuery: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    // Редьюсеры - функции, которые описывают, как состояние может изменяться
    reducers: {
        // Это "действие" (action), которое будет вызываться для обновления строки поиска
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

// Экспортируем action для использования в компонентах
export const { setSearchQuery } = filtersSlice.actions;

// Экспортируем редьюсер для добавления в главный store
export default filtersSlice.reducer;