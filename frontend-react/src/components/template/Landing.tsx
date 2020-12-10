import React, { useState } from 'react'

import Menu from './Menu';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';


const Landing: React.FC = ({children}) => {

    const [hideMenu, setHideMenu] = useState(false)

    function handleHideMenu() {
        setHideMenu(!hideMenu)
    }

    return (
        <div className={hideMenu ? "App-menu-hidden" : "App-menu-visible"}>
            <Header title="Base de Conhecimento" hideMenu={hideMenu} handleHideMenu={handleHideMenu} />
            <Menu isMenuVisible={!hideMenu} />
            <Content>
                {children}
            </Content>
            <Footer />
      </div>
    );
};

export default Landing