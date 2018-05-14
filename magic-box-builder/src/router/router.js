import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Bundle from './Bundle';
import MainLayout from 'component/layout'

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';

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
    <Router>
        <div>
            <MainLayout>
                <Switch>
                    <Route exact path="/" component={createComponent(Home)}/>
                </Switch>
            </MainLayout>
        </div>
    </Router>
);

export default getRouter;
