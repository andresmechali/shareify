import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import percentageCompleted from '../../utils/percentageCompleted';

const About = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold personal">{props.title}</h6>
            </div>

            <div className="ui-block-content">
                <ul className="widget w-personal-info">
                    <li>
                        <span className="title bold personal">First name:</span>
                        <span className="text">{props.user.firstName}</span>
                    </li>
                    <li>
                        <span className="title bold personal">Last name:</span>
                        <span className="text">{props.user.lastName}</span>
                    </li>
                    <li>
                        <span className="title bold personal">Username:</span>
                        <span className="text">{props.user.username}</span>
                    </li>
                    {props.user.description?
                        <li>
                            <span className="title bold personal">Description:</span>
                            <span className="text">{props.user.description}</span>
                        </li>:''
                    }
                    <li>
                        <span className="title bold personal">Registered:</span>
                        <span className="text">{new Date(props.user.registered).toLocaleDateString()}</span>
                    </li>
                    <li>
                        <span className="title bold personal">Last connection:</span>
                        <span className="text">{new Date(props.user.lastConnection).toLocaleDateString()}</span>
                    </li>
                    {props.user.countryOfBirth ?
                        <li>
                            <span className="title bold personal">Country of birth:</span>
                            <span className="text">{props.user.countryOfBirth}</span>
                        </li> : ''
                    }
                    {props.user.countryOfResidence ?
                        <li>
                            <span className="title bold personal">Country:</span>
                            <span className="text">{props.user.countryOfResidence}</span>
                        </li> : ''
                    }
                    {props.user.cityOfResidence ?
                        <li>
                            <span className="title bold personal">City:</span>
                            <span className="text">{props.user.cityOfResidence}</span>
                        </li> : ''
                    }
                    {props.user.lastLocation ?
                        <li>
                            <span className="title bold personal">Last location:</span>
                            <span className="text">{props.user.lastLocation}</span>
                        </li> : ''
                    }
                    {props.user.gender ?
                        <li>
                            <span className="title bold personal">Gender:</span>
                            <span className="text">{props.user.gender}</span>
                        </li> : ''
                    }

                    <div className="skills-item" style={{paddingTop: "45px"}}>

                        <div className="skills-item-meter">
                            <span className="skills-item-meter-active bg-primary skills-animate"
                                  style={{width: `${percentageCompleted(props.user)}%`, opacity: "1"}}
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
                                    {`${percentageCompleted(props.user)}%`}
                                </span>
                            </span>
                        </div>
                        <Link to='/settings/profile' className="btn btn-lg-2 btn-border-think custom-color c-grey full-width">
                            Complete it now
                        </Link>
                    </div>

                </ul>
            </div>
        </div>
    )
};

About.propTypes = {
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
};

export default About;