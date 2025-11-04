import React from 'react';
import { Button } from 'react-bootstrap';
import './SearchInput.css';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onSearch }) => {
    
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
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button variant="primary" onClick={onSearch}>Найти</Button>
        </div>
    );
};