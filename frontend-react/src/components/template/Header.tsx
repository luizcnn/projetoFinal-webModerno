import React from 'react';
import { FaChevronLeft, FaChevronDown } from 'react-icons/fa'
import { Link } from 'react-router-dom';

import './styles/header.css'
import UserDropdown from './UserDropdown';

interface HeaderProps {
    title: string;
    handleHideMenu: Function
    hideMenu: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, hideMenu, handleHideMenu }) => {

    return (
        <header className="header">
            <button type='button' className="toggle" onClick={() => handleHideMenu()}>
                {hideMenu ? <FaChevronDown /> : <FaChevronLeft />}
            </button>
            <h1 className="title">
                <Link to="/">
                    { title }
                </Link>
            </h1>
            <UserDropdown />
        </header>
    )
}

export default Header;