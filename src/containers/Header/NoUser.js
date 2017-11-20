import React from 'react';
import Li from '../../components/List/Li';

class NoUser extends React.Component {
    render() {
        return (
            <div className="control-block no-user">
                <ul className="nav navbar-nav navbar-right inline-list">
                    <Li link="/signup" text="Sign up" />
                    <Li link="/login" text="Login" />
                </ul>
            </div>

        )
    }
}

export default NoUser;