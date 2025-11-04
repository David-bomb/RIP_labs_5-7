import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getServerById } from '../api/client';
import type { IServer } from '../api/types';
import { BreadcrumbsComponent } from '../components/Breadcrumbs/BreadcrumbsComponent';
import { Spinner, Table } from 'react-bootstrap';
import defaultImage from '../assets/default_server_image.webp';
import './ServerDetailPage.css';

export const ServerDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [server, setServer] = useState<IServer | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            getServerById(Number(id))
                .then(data => {
                    setServer(data || null);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [id]);

    if (isLoading) {
        return <div className="spinner-container"><Spinner animation="border" /></div>;
    }

    if (!server) {
        return (
            <>
                <BreadcrumbsComponent crumbs={[{ label: 'Каталог', path: '/servers' }, { label: 'Сервер не найден' }]} />
                <h1>Сервер не найден</h1>
            </>
        );
    }

    return (
        <>
            <BreadcrumbsComponent crumbs={[{ label: 'Каталог', path: '/servers' }, { label: server.name }]} />
            <div className="detail-container">
                <div className="detail-img">
                    <img src={server.image_url || defaultImage} alt={server.name} className="detail-img-fixed" />
                </div>
                <div className="detail-description">
                    <h1 className="detail-title">{server.name}</h1>
                    <p>{server.description}</p>
                </div>
                <div className="detail-info">
                    <h2 className="detail-specs-title">Технические характеристики</h2>
                    <Table borderless className="detail-specs-table">
                        <tbody>
                            <tr>
                                <td>Ядра CPU</td>
                                <td>{server.cpu_cores}</td>
                            </tr>
                            <tr>
                                <td>Количество GPU</td>
                                <td>{server.gpu_count}</td>
                            </tr>
                            {server.gpu_count > 0 && (
                                <tr>
                                    <td>Видеопамять (VRAM)</td>
                                    <td>{server.gpu_vram_gb} GB</td>
                                </tr>
                            )}
                            <tr>
                                <td>Оперативная память (RAM)</td>
                                <td>{server.ram_gb} GB</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};