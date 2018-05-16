import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Bundle from './Bundle';
import MainLayout from 'component/layout'

import Home from 'bundle-loader?lazy&name=home!pages/Home';
import Edit from 'bundle-loader?lazy&name=edit!pages/Edit';

const Loading = () => {
    return <div>Loading...</div>
};

const createComponent = component => props => (
    <Bundle load={component}>
        {
            Component => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

const getRouter = () => (
    <MainLayout>
        <Router>
            <Switch>
                <Route exact path="/" component={createComponent(Home)}/>
                <Route path="/edit/:id" component={createComponent(Edit)}/>
            </Switch>
        </Router>
    </MainLayout>
);

export default getRouter;
