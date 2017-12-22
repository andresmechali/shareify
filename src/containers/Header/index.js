import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { removeCurrentUser } from "../../redux/actions/authActions";

import NoUser from './NoUser';
import User from './User';

class Header extends React.Component {
    render() {
        const { isAuthenticated } = this.props.auth;
        return(
            <div className="header-spacer">
                <header className="header">
                    <div className="page-title">
                        <Link to='/' className="no-underline">
                            <h6 className="bold main-title">TITLE</h6>
                        </Link>
                    </div>
                    <div className="header-content-wrapper">
                        {isAuthenticated ?
                            <User
                                image={this.props.auth.user.picturePath}
                                firstName={this.props.auth.user.firstName}
                                lastName={this.props.auth.user.lastName}
                                status={this.props.auth.user.status}
                                removeCurrentUser={this.props.removeCurrentUser}
                            />
                            :
                            <NoUser />
                        }
                    </div>
                </header>
            </div>
        )
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    removeCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        removeCurrentUser: () => dispatch(removeCurrentUser())
    }
};

Header = connect(mapStateToProps, mapDispatchToProps)(Header);


export default Header;
