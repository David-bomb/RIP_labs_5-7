import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarComponent.css';

export const NavbarComponent: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">Render Calc</Link>
                <div className="navbar-links">
                    <Link to="/servers">Серверы</Link>
                </div>
            </div>
        </nav>
    );
};