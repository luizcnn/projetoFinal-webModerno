import React from 'react'

import './styles/pageTitle.css'

interface PageTitleProps {
    title: string
    subtitle: string
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, children }) => {
    return (
        <div className="page-title">
            <span className="title">{children} {title}</span>
            <span className="subtitle">{subtitle}</span>
            <hr />
        </div>
    )
}

export default PageTitle;