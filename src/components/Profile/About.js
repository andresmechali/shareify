import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const About = (props) => {
    return (
        <div className="col-xl-3 order-xl-1 col-lg-3 order-lg-2 col-md-6 col-sm-6 col-xs-12">
            <div className="ui-block">
                <div className="ui-block-title">
                    <h6 className="title bold">{props.title}</h6>
                </div>

                <div className="ui-block-content">
                    <ul className="widget w-personal-info">
                        <li>
                            <span className="title bold">First name:</span>
                            <span className="text">{props.user.firstName}</span>
                        </li>
                        <li>
                            <span className="title bold">Last name:</span>
                            <span className="text">{props.user.lastName}</span>
                        </li>
                        <li>
                            <span className="title bold">Username:</span>
                            <span className="text">{props.user.username}</span>
                        </li>
                        {props.user.description?
                            <li>
                                <span className="title bold">Description:</span>
                                <span className="text">{props.user.description}</span>
                            </li>:''
                        }
                        <li>
                            <span className="title bold">Registered:</span>
                            <span className="text">{new Date(props.user.registered).toLocaleDateString()}</span>
                        </li>
                        <li>
                            <span className="title bold">Last connection:</span>
                            <span className="text">{new Date(props.user.lastConnection).toLocaleDateString()}</span>
                        </li>
                        {props.user.country ?
                            <li>
                                <span className="title bold">Country:</span>
                                <span className="text">{props.user.countryOfResidence}</span>
                            </li> : ''
                        }
                        {props.user.city ?
                            <li>
                                <span className="title bold">City:</span>
                                <span className="text">{props.user.cityOfResidence}</span>
                            </li> : ''
                        }
                        {props.user.lastLocation ?
                            <li>
                                <span className="title bold">Last location:</span>
                                <span className="text">{props.user.lastLocation}</span>
                            </li> : ''
                        }
                        {props.user.gender ?
                            <li>
                                <span className="title bold">Gender:</span>
                                <span className="text">{props.user.gender}</span>
                            </li> : ''
                        }
                        {props.user.offered.length > 0 ?
                            <li>
                                <span className="title bold">Items offered:</span>
                                <span className="text">{props.user.offered.length}</span>
                            </li>
                            :
                            <Link to='/offer/new' >
                                <button className="btn btn-lg btn-blue " style={{marginTop: "15px"}}>Offer some item</button>
                            </Link>
                        }
                        {props.user.requested.length > 0 ?
                            <li>
                                <span className="title bold">Items requested:</span>
                                <span className="text">{props.user.requested.length}</span>
                            </li>
                            :
                            <Link to='/profile'>
                                <button className="btn btn-lg btn-green" style={{marginTop: "15px"}}>Ask for something</button>
                            </Link>
                        }

                        <div className="skills-item" style={{paddingTop: "20px"}}>

                            <div className="skills-item-meter">
                                <span className="skills-item-meter-active bg-primary skills-animate"
                                      style={{width: "64%", opacity: "1"}}
                                />
                            </div>
                            <div className="skills-item-info">
                                <span className="skills-item-title">
                                    <label>
                                        Profile completed
                                    </label>
                                </span>

                                <span className="skills-item-count">
                                    <span className="count-animate" />
                                    <span className="units">
                                        64%
                                    </span>
                                </span>
                            </div>
                        </div>

                    </ul>
                </div>
            </div>
        </div>
    )
};

About.propTypes = {
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
};

export default About;