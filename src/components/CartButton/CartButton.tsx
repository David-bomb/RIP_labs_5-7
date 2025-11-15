import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCartInfo } from '../../api/client';
import type { ICartInfo } from '../../api/types';

import serverIcon from '../../assets/server_ico.png'; // Убедитесь, что иконка есть в assets
import './CartButton.css';

export const CartButton: React.FC = () => {
    // Начальное состояние - "два нуля", как требовал преподаватель
    const [cartInfo, setCartInfo] = useState<ICartInfo>({ scene_render_id: null, servers_count: 0 });

    useEffect(() => {
        // Загружаем актуальную информацию при монтировании компонента
        getCartInfo().then(data => {
            setCartInfo(data);
        });
    }, []);

    const { scene_render_id, servers_count } = cartInfo;
    const isActive = servers_count > 0 && scene_render_id !== null;

    if (isActive) {
        return (
            <Link to={`/scene_render_config/${scene_render_id}`} className="floating-action-button">
                <img src={serverIcon} alt="Выбранное" />
                <span className="fab-counter">{servers_count}</span>
            </Link>
        );
    }

    return (
        <div className="floating-action-button disabled">
            <img src={serverIcon} alt="Выбранное" />
            <span className="fab-counter">0</span>
        </div>
    );
};