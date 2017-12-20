import React from 'react';
import { Route } from 'react-router-dom';

import requireAuth from '../../utils/requireAuth';

import Header from '../Header';
import Home from '../Home';
import About from '../About';
import Signup from '../Signup';
import Login from '../Login';
import Settings from '../Profile/Settings';
import Offer from '../Offer';
import Request from '../Request';
import Profile from '../Profile';
import Item from '../Item';
import Conversation from '../Conversation';

const App = () => (
    <div>
        <Header />

        <main>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/offer/new" component={requireAuth(Offer)}/>
            <Route exact path="/ask/new" component={requireAuth(Request)}/>
            <Route path="/settings" component={requireAuth(Settings)} />
            <Route path="/profile" component={requireAuth(Profile)} />
            <Route path="/item/:id" component={requireAuth(Item)} />
            <Route path="/conversation/:id" component={requireAuth(Conversation)} />
        </main>
    </div>
);

export default App;