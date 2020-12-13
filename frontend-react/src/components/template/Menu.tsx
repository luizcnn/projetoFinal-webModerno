import React from 'react'
import { FaSearch } from 'react-icons/fa'

import Tree from './Tree'

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
                        <Tree />
                    </div>
                </aside>}
        </>
    );
};

export default Menu;