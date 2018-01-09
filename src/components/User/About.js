import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';

const About = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold personal">{props.title}</h6>
            </div>

            <div className="ui-block-content">
                <ul className="widget w-personal-info">
                    <Image
                        src={props.user.picturePath}
                        width="100%"
                        height="100%"
                    />
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
                        <span className="text">{new Date(props.user.registered).toLocaleDateString('en-GB')}</span>
                    </li>
                    <li>
                        <span className="title bold personal">Last connection:</span>
                        <span className="text">{new Date(props.user.lastConnection).toLocaleDateString('en-GB')}</span>
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