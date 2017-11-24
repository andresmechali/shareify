import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const LastRequested = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold">
                    Last requested
                </h6>
            </div>

            <div className="ui-block-content">
                {props.user.requested.length > 0?
                    <ul className="widget w-last-photo js-zoom-gallery">
                        {props.user.requested.slice(0, 9).map((item, key) => (
                            <li key={key}>
                                <a>
                                    <img src={require(`../../images/${item.picturePath}`)}
                                         alt=""
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                    :
                    <div>
                        No items requested yet
                        <Link to='/ask/new'>
                            <button className="btn btn-lg-2 btn-green full-width" style={{marginTop: "15px"}}>Ask for something</button>
                        </Link>
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