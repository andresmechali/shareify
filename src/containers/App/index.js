import React from 'react';
import { Route } from 'react-router-dom';

import requireAuth from '../../utils/requireAuth';

import Header from '../Header';
import Home from '../Home';
import About from '../About';
import Signup from '../Signup';
import Login from '../Login';
import Settings from '../Settings/Settings';
import Offer from '../Offer';

const App = () => (
    <div>
        <Header />

        <main>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/offer/new" component={Offer}/>
            <Route path="/settings" component={requireAuth(Settings)} />
        </main>
    </div>
);

export default App;