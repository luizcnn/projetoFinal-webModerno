import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { FaCogs } from 'react-icons/fa';
import Landing from '../template/Landing';

import PageTitle from '../template/PageTitle';

import './styles/adminPages.css'
import UserAdmin from './UserAdmin';

function AdminPages() {


    return (
        <Landing>
            <div className="admin-pages">
                <PageTitle title="Administração do Sistema" subtitle="Cadastro & Cia">
                    <FaCogs />
                </PageTitle>
                <div className="admin-pages-tab">
                    <Tabs defaultActiveKey="articles">
                        <Tab eventKey="articles" title="Artigos">
                            Home content
                        </Tab>
                        <Tab eventKey="categories" title="Categorias">
                            Profile content
                        </Tab>
                        <Tab eventKey="users" title="Usuários">
                            <UserAdmin />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </Landing>
    );
};

export default AdminPages;