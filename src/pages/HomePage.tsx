import React from 'react';
import { BackgroundVideo } from '../components/BackgroundVideo/BackgroundVideo';

export const HomePage: React.FC = () => {
    return (
        <>
            <BackgroundVideo />
            <div className="text-center mt-5">
                <h1>Добро пожаловать в Render Calc</h1>
                <p className="lead">
                Render Calc — сервис рендер-фермы для креаторов и студий: мы предоставляем мощные серверные конфигурации
                для параллельного рендеринга, обучения моделей и ускорения производственных пайплайнов. Быстро рассчитывайте
                время рендеринга и подбирайте оптимальную конфигурацию под ваш проект.
                </p>
                {/* Кнопка удалена */}
            </div>
        </>
    );
};