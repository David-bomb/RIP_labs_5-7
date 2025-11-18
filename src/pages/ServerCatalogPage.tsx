import React, { useEffect, useState } from 'react';
import { getServers } from '../api/client';
import type { IServer } from '../api/types';
import { ServerCard } from '../components/ServerCard/ServerCard';
import { SearchInput } from '../components/SearchInput/SearchInput';
import { BreadcrumbsComponent } from '../components/Breadcrumbs/BreadcrumbsComponent';
import { Spinner } from 'react-bootstrap';
import './ServerCatalogPage.css';

// --- ДОБАВЛЕНЫ ИМПОРТЫ REDUX ---
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearchQuery } from '../store/filtersSlice';

export const ServerCatalogPage: React.FC = () => {
    const [servers, setServers] = useState<IServer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Получаем dispatch и searchQuery из Redux
    const dispatch = useAppDispatch();
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);

    const fetchServers = (query: string) => {
        setIsLoading(true);
        getServers(query)
            .then(data => {
                setServers(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        // При первой загрузке страницы используем значение из Redux
        fetchServers(searchQuery); 
    }, []); // Пустой массив зависимостей, чтобы сработал только один раз

    const handleSearch = () => {
        // При нажатии на кнопку "Найти", используем текущее значение из Redux
        fetchServers(searchQuery);
    };

    return (
        <>
            <BreadcrumbsComponent crumbs={[{ label: 'Каталог' }]} />
            {/* Компонент SearchInput больше не принимает value и onChange */}
            <SearchInput onSearch={handleSearch} />
            <h1>Конфигурации серверов</h1>
            {isLoading ? (
                <div className="spinner-container">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div className="catalog-grid">
                    {servers.length > 0 ? (
                        servers.map(server => <ServerCard key={server.id} server={server} />)
                    ) : (
                        <p>На данный момент доступных серверов нет.</p>
                    )}
                </div>
            )}
        </>
    );
};