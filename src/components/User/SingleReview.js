import React from 'react';
import PropTypes from 'prop-types';

const SingleReview = (props) => {
    return (
        <div>
            <div className="ui-block-title">
                <a href={`/user/${props.review.userFrom._id}`}>{`${props.review.userFrom.firstName} ${props.review.userFrom.lastName}`}</a>
                <span style={{float: "right"}}>{props.review.rate}</span>
            </div>
            <div className="ui-block-content">
                {props.review.comment}
            </div>
        </div>
    )
};

SingleReview.propTypes = {
    review: PropTypes.object.isRequired,
};

export default SingleReview;