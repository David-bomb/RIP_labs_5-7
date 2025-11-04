import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { IServer } from '../../api/types';
import './ServerCard.css';

import cpuIcon from '../../assets/cpu_ico.png';
import gpuIcon from '../../assets/gpu_ico.png';
import ramIcon from '../../assets/ram_ico.png';
import defaultImage from '../../assets/default_server_image.webp';


interface ServerCardProps {
    server: IServer;
}

export const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
    return (
        <div className="server-card">
            <img 
                src={server.image_url || defaultImage} 
                alt={server.name} 
                className="server-card-img" 
            />
            <div className="server-card-body">
                <h2 className="server-card-title">{server.name}</h2>
                <div className="server-card-specs">
                    <div className="spec-item">
                        <img src={cpuIcon} alt="CPU" className="spec-icon" />
                        <span>CPU Cores: {server.cpu_cores}</span>
                    </div>
                    {server.gpu_count > 0 && (
                        <div className="spec-item">
                            <img src={gpuIcon} alt="GPU" className="spec-icon" />
                            <span>GPU: {server.gpu_count} x {server.gpu_vram_gb} GB</span>
                        </div>
                    )}
                    <div className="spec-item">
                        <img src={ramIcon} alt="RAM" className="spec-icon" />
                        <span>RAM: {server.ram_gb} GB</span>
                    </div>
                </div>
                <div className="server-card-actions">
                    <Link to={`/servers/${server.id}`}>
                        <Button variant="secondary" className="w-100">Подробнее</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};