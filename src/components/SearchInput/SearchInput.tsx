import React from 'react';
import { Button } from 'react-bootstrap';
import './SearchInput.css';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSearchQuery } from '../../store/filtersSlice';

interface SearchInputProps {
    onSearch: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
    // Получаем dispatch и текущее значение searchQuery из Redux
    const dispatch = useAppDispatch();
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);
    
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };
    
    return (
        <div className="search-container">
            <input 
                className="search-input" 
                type="text" 
                placeholder="Поиск по названию..." 
                value={searchQuery}
                // При изменении вызываем action, чтобы обновить состояние в Redux
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                onKeyDown={handleKeyDown}
            />
            <Button variant="primary" onClick={onSearch}>Найти</Button>
        </div>
    );
};