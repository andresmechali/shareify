import React from 'react';
import PropTypes from 'prop-types';

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
                        <ul className="widget w-last-photo js-zoom-gallery">
                            {props.user.requested.map((item, key) => (
                                <li key={key}>
                                    <a href={`/item/${item._id}`}>
                                        <img src={require(`../../images/${item.picturePath}`)}
                                             alt=""
                                        />
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