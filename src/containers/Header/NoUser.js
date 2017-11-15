import React from 'react';
import Li from '../../components/List/Li';

class NoUser extends React.Component {
    render() {
        return (
            <ul className="nav navbar-nav navbar-right">
                <Li link="/signup" text="Sign up" />
                <Li link="/login" text="Login" />
            </ul>

        )
    }
}

export default NoUser;