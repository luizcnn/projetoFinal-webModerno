import React from 'react'
import { FaSearch } from 'react-icons/fa'

import './styles/menu.css'

interface MenuProps {
    isMenuVisible: boolean
}

const Menu: React.FC<MenuProps> = ({ isMenuVisible }) => {
    return (
        <>
            {isMenuVisible && 
                <aside className="menu">
                    <div className="menu-filter">
                        <FaSearch />
                        <input 
                            type="text" 
                            placeholder="Digite para filtrar..."
                            className="filter-field"
                        />
                    </div>
                    <div className="tree">
                        <a href="/">Item 1</a>
                        <br />
                        <a href="/">Item 2</a>
                    </div>
                </aside>}
        </>
    );
};

export default Menu;