import React from 'react';
import './BackgroundVideo.css';
// Импортируем GIF как обычный ассет
import gifSource from '../../assets/PC_fin.gif';

export const BackgroundVideo: React.FC = () => {
    return (
        <div className="background-video-container">
            {/* Используем img вместо video */}
            <img 
                src={gifSource} 
                alt="Background Animation" 
                className="background-video" 
            />
        </div>
    );
};