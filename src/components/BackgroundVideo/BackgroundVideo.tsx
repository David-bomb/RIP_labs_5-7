import React from 'react';
import './BackgroundVideo.css';

// Импортируем видео как ресурс. Vite сам подставит правильный путь.
import videoFile from '/videos/PC_fin.mp4';

export const BackgroundVideo: React.FC = () => {
    return (
        <div className="background-video-container">
            <video autoPlay loop muted playsInline key={videoFile}>
                <source src={videoFile} type="video/mp4" />
                Ваш браузер не поддерживает тэг video.
            </video>
        </div>
    );
};