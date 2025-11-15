import React from 'react';
import './BackgroundVideo.css';

export const BackgroundVideo: React.FC = () => {
    return (
        <div className="background-video-container">
            <video autoPlay loop muted playsInline>
                <source src="/videos/PC_fin.mp4" type="video/mp4" />
                Ваш браузер не поддерживает тэг video.
            </video>
        </div>
    );
};