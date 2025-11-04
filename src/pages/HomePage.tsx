import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './HomePage.css';

export const HomePage: React.FC = () => {
    return (
        <div className="home-hero">
            <h1 className="home-title">Добро пожаловать в Render Calc</h1>
            <p className="home-lead">
                Render Calc — сервис рендер-фермы для креаторов и студий: мы предоставляем мощные серверные конфигурации
                для параллельного рендеринга, обучения моделей и ускорения производственных пайплайнов. Быстро рассчитывайте
                время рендеринга и подбирайте оптимальную конфигурацию под ваш проект.
            </p>
            <Link to="/servers">
                <Button variant="primary" size="lg">Перейти к каталогу</Button>
            </Link>
        </div>
    );
};