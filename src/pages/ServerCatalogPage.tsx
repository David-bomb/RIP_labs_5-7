import React, { useEffect, useState } from 'react';
import { getServers } from '../api/client';
import type { IServer } from '../api/types';
import { ServerCard } from '../components/ServerCard/ServerCard';
import { SearchInput } from '../components/SearchInput/SearchInput';
import { BreadcrumbsComponent } from '../components/Breadcrumbs/BreadcrumbsComponent';
import { Spinner } from 'react-bootstrap';
import './ServerCatalogPage.css';

export const ServerCatalogPage: React.FC = () => {
    const [servers, setServers] = useState<IServer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

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
        fetchServers('');
    }, []);

    const handleSearch = () => {
        fetchServers(searchQuery);
    };

    return (
        <>
            <BreadcrumbsComponent crumbs={[{ label: 'Каталог' }]} />
            <SearchInput 
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
            />
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