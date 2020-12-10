import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import AdminPages from './components/admin/AdminPages';
import Home from './components/home/Home'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Home }/>
                <Route path="/admin" component={AdminPages} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes