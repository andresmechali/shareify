import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';
import Image from '../../components/Image';

const User = (props) => {
    return (
        <div className="control-block">
            <div className="author-page author vcard inline-items more">
                <div className="author-thumb">
                    <Image
                        src={props.image}
                        height="36"
                        width="36"
                        className="avatar"
                    />
                </div>
                <a className="author-name fn">
                    <div className="author-title">
                        {props.firstName} {props.lastName}
                    </div>
                    <span className="author-subtitle">
                        {props.status}
                    </span>

                </a>
                <Dropdown
                    removeCurrentUser={props.removeCurrentUser}
                />
            </div>
        </div>
    )
};

User.propTypes = {
    image: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    removeCurrentUser: PropTypes.func.isRequired,
};

export default User;