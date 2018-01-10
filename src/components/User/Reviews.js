import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import SingleReview from "./SingleReview";

const Reviews = (props) => {
    let reviewsTo = [];
    props.reviews.forEach(review => {
        if (review.userTo._id === props.user._id) {
            reviewsTo.push(review);
        }
    });
    let reviewSum = 0;
    reviewsTo.forEach(review => {
        reviewSum = reviewSum + review.rate;
    });
    let reviewAverage = 0;
    if (reviewsTo.length > 0) {
        reviewAverage = reviewSum / reviewsTo.length;
    }
    return (
        <div>
            <div className="ui-block">
                <div className="ui-block-title">
                    <h6 className="title bold personal">Reviews</h6>
                    <span className="bold" style={{float: "right"}}>{reviewAverage}</span>
                </div>

                <div className="ui-block-content">
                    <div className="star-selection">
                        <span className={classNames('star-icon-fixed', {'full': reviewAverage >= 1})} id="1">☆</span>
                        <span className={classNames('star-icon-fixed', {'full': reviewAverage >= 2})} id="2">☆</span>
                        <span className={classNames('star-icon-fixed', {'full': reviewAverage >= 3})} id="3">☆</span>
                        <span className={classNames('star-icon-fixed', {'full': reviewAverage >= 4})} id="4">☆</span>
                        <span className={classNames('star-icon-fixed', {'full': reviewAverage >= 5})} id="5">☆</span>
                    </div>
                </div>
            </div>
            <div className="ui-block">
                {reviewsTo.map((review, key) => {
                    return (
                        <SingleReview
                            key={key}
                            review={review}
                        />
                    )
                })}
            </div>
        </div>
    )
};

Reviews.propTypes = {
    user: PropTypes.object.isRequired,
    reviews: PropTypes.array.isRequired,
};

export default Reviews;