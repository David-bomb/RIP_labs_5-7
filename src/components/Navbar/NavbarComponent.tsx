import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavbarComponent.css';

export const NavbarComponent: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Функция для закрытия меню при клике на ссылку
    const closeMobileMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>Render Calc</Link>
                
                {/* Ссылки для десктопа */}
                <div className="navbar-links desktop-only">
                    <NavLink to="/servers">Серверы</NavLink>
                </div>

                {/* Кнопка "бургер" для мобильных */}
                <div 
                    className={`navbar-burger ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            
            {/* ИСПРАВЛЕНО: Выпадающее меню теперь рендерится, когда isMenuOpen === true */}
            {isMenuOpen && (
                <div className="navbar-mobile-menu">
                    <NavLink to="/servers" onClick={closeMobileMenu}>Серверы</NavLink>
                </div>
            )}
        </nav>
    );
};