import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Dropdown extends React.Component {
    render() {
        return (
            <div className="more-dropdown more-with-triangle">
                <div className="mCustomScrollbar ps ps--theme_default">
                    <div className="ui-block-title ui-block-title-small">
                        <h6 className="title">YOUR ACCOUNT</h6>
                    </div>
                    <ul className="account-settings">
                        <li>
                            <Link to="/profile">
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings/profile">
                                <span>Settings</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/ask/new">
                                <span>Ask something</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/offer/new">
                                <span>Offer something</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <span onClick={this.props.removeCurrentUser}>Logout</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="ui-block-title ui-block-title-small">
                        <h6 className="title">ABOUT US</h6>
                    </div>
                    <ul className="account-settings">
                        <li>
                            <Link to="/">
                                <span>Terms and conditions</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <span>FAQ</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <span>About us</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <span>Contact us</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
};

Dropdown.propTypes = {
    removeCurrentUser: PropTypes.func.isRequired,
};



export default Dropdown;