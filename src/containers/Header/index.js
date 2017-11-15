import React from 'react';
import { Link } from 'react-router-dom';

import NoUser from './NoUser';

export default () => {
    //const profilePicture = require('../../images/andresmechali.jpg');
    return (
        <div className="header-spacer">
            <header className="header">
                <div className="page-title">
                    <Link to='/' className="no-underline">
                        <h6 className="bold main-title">TITLE</h6>
                    </Link>
                </div>
                <div className="header-content-wrapper">
                    <div className="control-block">
                        <NoUser />
                    </div>
                </div>
            </header>
        </div>
    )
}
