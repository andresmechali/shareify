import React from 'react';
import PropTypes from 'prop-types'

const User = (props) => {
    return (
        <div className="author-page author vcard inline-items more">
            <div className="author-thumb">
                <img src={props.image} alt="Profile" className="avatar"/>
            </div>
        </div>
    )
};

User.propTypes = {
    image: PropTypes.string.isRequired,
};

export default User;