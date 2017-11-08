import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header';
import Home from '../Home';
import About from '../About';
import Signup from '../Signup';

const App = () => (
    <div>
        <Header />

        <main>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/signup" component={Signup}/>
        </main>
    </div>
);

export default App;