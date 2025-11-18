import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Используйте эти хуки по всему приложению вместо обычных `useDispatch` и `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();