import React from 'react';
import { Link } from 'react-router-dom';
import './BreadcrumbsComponent.css';

interface ICrumb {
    label: string;
    path?: string;
}

interface BreadcrumbsProps {
    crumbs: ICrumb[];
}

export const BreadcrumbsComponent: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
    return (
        <ul className="breadcrumbs">
            <li><Link to="/">Главная</Link></li>
            {crumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                    <li className="slash">/</li>
                    {index === crumbs.length - 1 ? (
                        <li className="active">{crumb.label}</li>
                    ) : (
                        <li><Link to={crumb.path || ""}>{crumb.label}</Link></li>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
};