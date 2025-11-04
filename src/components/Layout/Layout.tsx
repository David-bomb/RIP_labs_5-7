import React from 'react';
import { NavbarComponent } from '../Navbar/NavbarComponent';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <NavbarComponent />
            <main className="main-container">
                {children}
            </main>
        </>
    );
};