import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const Review = (props) => {
    console.log(props.review);
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold personal">
                    Review
                </h6>
            </div>

            <div className="ui-block-content">
                <div>
                    <span className="bold">Date reviewed: </span>
                    {new Date(props.review.date).getDate()}-
                    {new Date(props.review.date).getMonth() + 1}-
                    {new Date(props.review.date).getFullYear()}
                </div>
                <div>
                    <span className="bold">Comment: </span>
                    {props.review.comment}
                </div>
                <div className="star-selection" style={{height: "50px"}}>
                    <span className={classNames('star-icon', {'full': props.review.rate >= 5})} id="5">☆</span>
                    <span className={classNames('star-icon', {'full': props.review.rate >= 4})} id="4">☆</span>
                    <span className={classNames('star-icon', {'full': props.review.rate >= 3})} id="3">☆</span>
                    <span className={classNames('star-icon', {'full': props.review.rate >= 2})} id="2">☆</span>
                    <span className={classNames('star-icon', {'full': props.review.rate >= 1})} id="1">☆</span>
                </div>
            </div>
        </div>
    )
};

Review.propTypes = {
    user: PropTypes.object.isRequired,
    review: PropTypes.object.isRequired,
};

export default Review;