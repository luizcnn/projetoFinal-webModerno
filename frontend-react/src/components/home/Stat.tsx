import React from 'react'

import './styles/stat.css'

interface StatProps {
    title: string
    color?: string
    value: Number
}

const Stat: React.FC<StatProps> = ({ title, value, color, children }) => {
    return (
        <div className="stat">
            <div className="stat-icon" style={{color: color || '#000'}}>
                {children}
            </div>
            <div className="stat-info">
                <span className="stat-title">{ title }</span>
                <span className="stat-value">{ value }</span>
            </div>
        </div>
    )
}

export default Stat;