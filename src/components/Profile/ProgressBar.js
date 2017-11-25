import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Link } from 'react-router-dom';

const ProgressBar = (props) => {
    return (
        <div className="skills-item" style={{paddingTop: "45px"}}>

            <div className="skills-item-meter">
                            <span className={classNames("skills-item-meter-active bg-primary skills-animate",
                                {"completed": props.percentageCompleted === 100})}
                                  style={{width: `${props.percentageCompleted}%`, opacity: "1"}}
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
                                    {`${props.percentageCompleted}%`}
                                </span>
                            </span>
            </div>
            {props.percentageCompleted === 100 || !props.completeButton?
                <Link to='/profile/settings' className="btn btn-lg-2 btn-border-think custom-color c-grey full-width">
                    Complete it now
                </Link>:''
            }
        </div>
    )
};

ProgressBar.propTypes = {
    percentageCompleted: PropTypes.number.isRequired,
};

export default ProgressBar;