import React from 'react';
import PropTypes from 'prop-types';

import RequestSmall from "../Profile/RequestSmall";

const LastRequested = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold">
                    Requested by {props.user.firstName}
                </h6>
            </div>

            <div className="ui-block-content">
                {props.user.requested.length > 0?
                    <div>
                        <ul className="single-request mini">
                            {props.user.requested.slice(0, 9).map((item, key) => (
                                <li key={key}>
                                    <a href={`/item/${item._id}`}>
                                        <RequestSmall item={item}/>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    :
                    <div>
                        No items requested yet
                    </div>
                }
            </div>
        </div>
    )
};

LastRequested.propTypes = {
    user: PropTypes.object.isRequired,
};

export default LastRequested;