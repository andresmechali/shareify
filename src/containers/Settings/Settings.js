import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { push } from 'react-router-redux';
import { addFlashMessage } from "../../redux/actions/flashMessages";
import { setCurrentUser } from "../../redux/actions/authActions";

import {
    BrowserRouter,
    Route,
    Link,
} from 'react-router-dom';

import Profile from './Profile';
import Preferences from './Preferences';

/*const routes = [
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
];*/


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
                        <Route
                            path={'/settings/profile'}
                            exact={true}
                            component={() => <Profile user={this.props.user}
                                                      push={this.props.push}
                                                      addFlashMessage={this.props.addFlashMessage}
                                                      flashMessages={this.props.flashMessages}
                                                      setCurrentUser={this.props.setCurrentUser}/>}
                        />

                        <Route
                            path={'/settings/preferences'}
                            exact={true}
                            component={() => <Preferences user={this.props.user}
                                                      push={this.props.push}
                                                      addFlashMessage={this.props.addFlashMessage}
                                                      flashMessages={this.props.flashMessages}
                                                      setCurrentUser={this.props.setCurrentUser}/>}
                        />
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

Settings.propTypes = {
    push: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    flashMessages: PropTypes.array.isRequired,
};


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        flashMessages: state.flashMessages,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        push: (path) => dispatch(push(path)),
        addFlashMessage: (msg) => dispatch(addFlashMessage(msg)),
        setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);