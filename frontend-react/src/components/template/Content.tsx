import React from 'react'

import './styles/contentStyle.css'

const Content: React.FC = ({ children }) => {
    return (
        <div className="content">
            { children }
        </div>
    );
};

export default Content;