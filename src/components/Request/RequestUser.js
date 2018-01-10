import React from 'react';
import PropTypes from 'prop-types';

import ReviewStars from '../../components/User/ReviewStars';
import Image from '../Image';

const RequestUser = (props) => {
    console.log(props);
    const userOther = props.user._id === props.activeRequest.userFrom._id ? props.activeRequest.userTo : props.activeRequest.userFrom;
    return (
        <div>
            <div className="ui-block">
                <div className="ui-block-title">
                    <h6 className="title bold personal">
                        {props.activeRequest.userFrom.firstName} {props.activeRequest.userFrom.lastName}
                    </h6>
                </div>

                <div className="ui-block-content">
                    <ul className="widget w-personal-info">
                        <Image
                            src={props.activeRequest.userFrom.picturePath}
                            width="100%"
                            height="100%"
                        />

                        {props.activeRequest.userFrom.description
                            ? <div><span className="bold">Description:</span> {props.activeRequest.userFrom.description}</div>
                            : ""
                        }
                        {props.activeRequest.userFrom.reviews.length === 0
                            ? <div><span className="bold">No reviews yet</span></div>
                            : <div>
                                <ReviewStars
                                    reviews={props.user.reviews}
                                    userOtherId={userOther._id}
                                />
                                <a href={`/user/${props.user._id}`}>See more</a>
                            </div>
                        }
                    </ul>
                </div>
            </div>

            {props.activeRequest.message
                ? <div>
                    <div className="ui-block">
                        <div className="ui-block-title">
                            <h6 className="title bold personal">
                                Message
                            </h6>
                        </div>

                        <div className="ui-block-content">
                            {props.activeRequest.message}
                        </div>
                    </div>
                </div>
                : ""
            }
        </div>
    )
};

RequestUser.propTypes = {
    user: PropTypes.object.isRequired,
    activeRequest: PropTypes.object.isRequired,
};

export default RequestUser;