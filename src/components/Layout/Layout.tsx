import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavbarComponent } from '../Navbar/NavbarComponent';
import { CartButton } from '../CartButton/CartButton';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <>
            <NavbarComponent />
            {/* <CartButton /> */}
            {!isHomePage && <CartButton />}
            {/* Добавляем класс 'transparent-bg' только для главной страницы */}
            <main className={`main-container ${isHomePage ? 'transparent-bg' : ''}`}>
                {children}
            </main>
        </>
    );
};