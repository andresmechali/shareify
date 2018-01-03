import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import ReviewStars from '../../components/User/ReviewStars';

const RequestItem = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold personal">
                    {props.activeRequest.item.name}
                </h6>
            </div>

            <div className="ui-block-content">
                <ul className="widget w-personal-info">
                    <img src={require(`../../images/${props.activeRequest.item.picturePath}`)} width="100%" height="100%" alt=""/>

                    {props.activeRequest.item.description
                        ? <div><span className="bold">Description:</span> {props.activeRequest.item.description}</div>
                        : ""
                    }

                    {props.activeRequest.item.reviews.length !== 0
                        ? <div><span className="bold">No reviews yet</span></div>
                        : <div>
                            <ReviewStars
                                reviews={props.activeRequest.item.reviews}
                                userOtherId={props.activeRequest.item.user._id}
                            />
                        </div>
                    }

                    <div><span className="bold">Location:</span> {props.activeRequest.item.location}</div>
                    <div><span className="bold">Published:</span> {moment(props.activeRequest.item.created).fromNow()}</div>
                    <a href={`/item/${props.activeRequest.item._id}`}>See more</a>
                </ul>
            </div>
        </div>
    )
};

RequestItem.propTypes = {
    activeRequest: PropTypes.object.isRequired,
};

export default RequestItem;