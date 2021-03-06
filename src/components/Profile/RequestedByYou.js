import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import RequestSmall from "./RequestSmall";

const LastRequested = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold">
                    Requested by you
                </h6>
                {props.user.requested.length > 0 ?
                    <span>
                        <Link
                            to="/ask/new"
                            className="btn btn-lg-2 btn-green"
                            style={{float: "right"}}
                        >
                            +
                        </Link>
                    </span>
                    : ""
                }
            </div>

            <div className="ui-block-content">
                {props.user.requested.length > 0?
                    <ul className="single-request mini">
                        {props.user.requested.slice(0, 9).map((item, key) => (
                            <li key={key}>
                                <a href={`/item/${item._id}`}>
                                    <RequestSmall item={item}/>
                                </a>
                            </li>
                        ))}
                    </ul>
                    :
                    <div>
                        No items requested yet
                        <a href='/ask/new'>
                            <button className="btn btn-lg-2 btn-green full-width" style={{marginTop: "15px"}}>Ask for something</button>
                        </a>
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