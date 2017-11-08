import React from 'react';

export default () => {
    const profilePicture = require('../../images/andresmechali.jpg');
    return (
        <div className="header-spacer">
            <header className="header">
                <div className="page-title">
                    <h6 className="bold">TITLE</h6>
                </div>
                <div className="header-content-wrapper">
                    <div className="control-block">
                        <div className="author-page author vcard inline-items more">
                            <div className="author-thumb">
                                <img src={profilePicture} alt="Profile" className="avatar"/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
