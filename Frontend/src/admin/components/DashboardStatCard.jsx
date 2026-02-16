import React from 'react';

const DashboardStatCard = ({ title, value, icon, colorClass }) => {
    return (
        <div className="dashboard-card stat-card">
            <div className={`dashboard-stat-icon ${colorClass}`}>
                <i className={icon}></i>
            </div>
            <div className="dashboard-stat-content">
                <h4>{title}</h4>
                <h5>{value}</h5>
            </div>
        </div>
    );
};

export default DashboardStatCard;
