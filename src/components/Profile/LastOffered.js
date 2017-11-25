import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const LastOffered = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold">
                    Last offered
                </h6>
            </div>

            <div className="ui-block-content">
                {props.user.offered.length > 0?
                    <div>
                        <ul className="widget w-last-photo js-zoom-gallery">
                            {props.user.offered.slice(0, 9).map((item, key) => (
                                <li key={key}>
                                    <a>
                                        <img src={require(`../../images/${item.picturePath}`)}
                                             alt=""
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {props.user.offered.length > 1?
                            "View all" : ""
                        }
                    </div>
                    :
                    <div>
                        No items offered yet
                        <Link to='/offer/new'>
                            <button className="btn btn-lg-2 btn-blue full-width" style={{marginTop: "15px"}}>Start offering</button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
};

LastOffered.propTypes = {
    user: PropTypes.object.isRequired,
};

export default LastOffered;