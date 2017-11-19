import React from 'react';
//import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
import {
    BrowserRouter,
    Route,
    Link,
} from 'react-router-dom';

import Profile from './Profile';
import Preferences from './Preferences';

const routes = [
    {
        path: '/settings/profile',
        exact: true,
        main: () => <Profile />
    },
    {
        path: '/settings/preferences',
        exact: true,
        main: () => <Preferences />
    },
];


class Settings extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="row">
                    <div className="container">
                        <div className="col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 order-md-2 col-sm-12 col-xs-12 responsive-display-none">
                            <div className="ui-block">
                                <div className="your-profile">
                                    <div className="ui-block-title">
                                        <Link to='/settings/profile' className="h6 title bold">
                                            Profile settings
                                        </Link>
                                    </div>
                                    <div className="ui-block-title">
                                        <Link to='/settings/preferences' className="h6 title bold">
                                            Preferences
                                        </Link>
                                    </div>
                                    <div className="ui-block-title">
                                        <Link to='/settings/messages' className="h6 title bold">
                                            Messages
                                        </Link>
                                        <Link to='/settings/messages' className="items-round-little bg-primary">
                                            4
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        ))}
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default Settings;