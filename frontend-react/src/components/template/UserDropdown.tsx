import React from 'react';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import { FaChevronDown, FaCogs, FaSignOutAlt } from 'react-icons/fa';

import './styles/userDropdown.css';

function UserDropdown() {
    return (
        <div className="user-dropdown">
            <div className="user-button">
                <span className="d-none d-sm-block">Usuário Mock</span>
                <div className="user-dropdown-img">
                    <Gravatar email="luizcn23@gmail.com" />
                </div>
                <FaChevronDown />
                <div className="user-dropdown-content">
                    <Link to="/admin">
                        <FaCogs /> Administração
                    </Link>
                    <Link to="/">
                        <FaSignOutAlt /> Sair
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserDropdown;